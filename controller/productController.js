const Category = require("../models/category");
const categorySection = require("../models/categorySection");
const Product = require("../models/product");
const Joi = require("joi");
const fs = require("fs");
const formidable = require('formidable');
const AdmZip = require('adm-zip');
const ProductDto = require("../dto/admin/product");

const productController = {
    async CreateProduct(req,res,next){

    // 1. validate user input
    const productRegisterSchema = Joi.object({
       title:  Joi.string().min(30).required(),
       slug:  Joi.string().min(30).required(),
       category:  Joi.string().required(),
       color:  Joi.string().required(),
       brand:  Joi.string().required(),
       fuelType: Joi.string().required(),
       type: Joi.string().required(),
       dryerOption:  Joi.string().required(),
       images:  Joi.string().allow(null),
       feature:  Joi.string().required(),
       bullet1:  Joi.string().required(),
       bullet2:  Joi.string().required(),
       bullet3:  Joi.string().required(),
       bullet4:  Joi.string().required(),
       salePrice:  Joi.string(),
       regularPrice:  Joi.string().required(),
       modelNo:  Joi.string().required(),
       itemId: Joi.string().required(),
       stock:  Joi.string().required(),
       rating:  Joi.string().required(),
       lowerInstallment: Joi.string().required(),
       highInstallment:  Joi.string().required(),
       description:  Joi.string().required(),
       specification: Joi.string().required(),
       deliveryInfo:  Joi.string().required(),
      });
      const { error } = productRegisterSchema.validate(req.body);
      
      // 2. if error in validation -> return error via middleware
      if (error) {
        return next(error)
      }
      
      const { images,featuresVideo, threeSixty } = req.files;
      // Images Upload Start
      const imageKeys = Object.keys(req.files).filter(key => key.startsWith('images_'));
      let productImagesPath = [];

    for (const key of imageKeys) {
      const file = req.files[key];
      let imagePath = `storage/products/${Date.now()}-${file.name}`;
        file.mv(imagePath, (error) => {
          if (error) {
            const err = { status: 500, message: `Failed to store image: ${error}` };
          }
        });
        productImagesPath.push(imagePath);
    }
  


      // // Upload Features Video Start
      let featureVideoPath = `storage/products/videos/${Date.now()}-${featuresVideo.name}`;
        if (featuresVideo) {
          // Save the video file to your desired storage location
          featuresVideo.mv(featureVideoPath, (err => {
            if (err) {
              const error = {status:500,message:"Internal Server Error!"}
              return next(error)
            }
          }));
        }
      //   // Upload Features Video End

        // Upload 360 Start
                // Extract 360° zip file
        let threeVideoPath = `storage/products/three-sixty/${Date.now()}/`
        if (threeSixty) {
          // Save the zip file to a temporary location
          const tempFilePath = `upload/${threeSixty.name}`;
          threeSixty.mv(tempFilePath, (error) => {
            if (error) {
              const err = {status:500,message:`Failed to store zip file:${error}`}
              return next(err)
            } else {
              // Extract the zip file contents
              const zip = new AdmZip(tempFilePath);
              zip.extractAllTo(threeVideoPath, true);
      
              // Cleanup: remove the temporary zip file
              fs.unlink(tempFilePath, (unlinkError) => {
                if (unlinkError) {
                  console.error('Failed to remove temporary zip file:', unlinkError);
                }
              });
            }
          });
        }
        // console.log(productImagesPath)
        // console.log(featureVideoPath)
        // console.log(threeVideoPath)

          // Get Product Data from Request
          const {title,slug,category,color,brand,fuelType,type,dryerOption,feature,bullet1,bullet2,bullet3,bullet4,salePrice,regularPrice,modelNo,itemId,stock,rating,lowerInstallment,highInstallment,description,specification,deliveryInfo} = req.body;

        // Product Creation Start
        try{
         const titleInUse = await Product.exists({ title });        
          if (titleInUse) {
           const error = {
             status: 409,
             message: "Product Title Already Exits!",
           };
           return next(error);
          }
      
          try{

            const productToRegister = new Product({
              title,
           slug,
           category,
           color,
           brand,
           fuelType,
           type,
           dryerOption,
           feature,
           bullet1,
           bullet2,
           bullet3,
           bullet4,
           salePrice,
           regularPrice,
           images:productImagesPath,
           threeSixty:threeVideoPath,
           featuresVideo:featureVideoPath,
           modelNo,
           itemId,
           stock:parseInt(stock),
           rating,
           lowerInstallment,
           highInstallment,
           description,
           specification,
           deliveryInfo,
          });
          
          const product = await productToRegister.save();
         }catch(error){
          console.log(error)
         }
          
         // Upload 360 End
        }catch(err){
          const error = {status:500,msg:"Internal Server Error!"}
          return next(error)
        }
        
        res.status(201).send({status:201,msg:'Product Created Successfully!'});

    },

    async GetProducts(req,res,next){
      
      try{
        const products = await Product.find({});
        
        // const productDto = new ProductDto(products)
        // let productsDTOs=[];
        // productDto.forEach((product) => {
        //   const productDTO = new ProductDto(product);
        //   productsDTOs.push(productDTO);
        // });
        // console.log(productsDTOs)

        return res.status(200).json({status:200,products:products});
      }catch(error){
        return next(error)
      }
    },


    async GetCategories(req,res,next){
      
      try{
        const categories = await Category.find({});
        return res.status(200).json({status:200,categories:categories});
      }catch(error){
        return next(error)
      }
    },
    async GetProductTypes(req,res,next){
      const {categoryId} = req.body;
      categorySection.find({ categoryId: categoryId,type:'types' })
      .populate('sectionItemsId')
      .exec()
      .then(productTypes => {
        // categorySections will contain an array of CategorySection documents
        return res.status(200).json({status:200,productTypes:productTypes});
      })
      .catch(err => {
          return res.status(500).json({msg:'Internal Server Error!'});
      });
    },
    async GetProductFeatures(req,res,next){
      const {categoryId} = req.body;
      
      categorySection.find({ categoryId: categoryId,type:'features' })
      .populate('sectionItemsId')
      .exec()
      .then(productFeatures => {
        // categorySections will contain an array of CategorySection documents
          return res.status(200).json({status:200,productFeatures:productFeatures});
      })
      .catch(err => {
          return res.status(500).json({msg:'Internal Server Error!'});
      });
    },
    async GetCategoryBrands(req,res,next){
      const {categoryId} = req.body;
      categorySection.find({ categoryId: categoryId,type:'brands' })
      .populate('sectionItemsId')
      .exec()
      .then(categoryBrands => {
        // categorySections will contain an array of CategorySection documents
          return res.status(200).json({status:200,categoryBrands:categoryBrands});
      })
      .catch(err => {
          return res.status(500).json({msg:'Internal Server Error!'});
      });
    },
    async GetCategoryColors(req,res,next){
      const {categoryId} = req.body;
      categorySection.find({ categoryId: categoryId,type:'colors' })
      .populate('sectionItemsId')
      .exec()
      .then(categoryColors => {
        // categorySections will contain an array of CategorySection documents
          return res.status(200).json({status:200,categoryColors:categoryColors});
      })
      .catch(err => {
          return res.status(500).json({msg:'Internal Server Error!'});
      });
    }

}

module.exports = productController;