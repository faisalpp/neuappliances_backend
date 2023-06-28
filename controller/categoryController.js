const Category = require("../models/category");
const Joi = require("joi");
const fs = require("fs");

const categoryController = {
    async CreateCategory(req,res,next){

    // 1. validate user input
    const categoryRegisterSchema = Joi.object({
        title: Joi.string().max(30).required(),
        image: Joi.string().required(),
        description: Joi.string().required(),
        slug: Joi.string().required(),
      });
      const { error } = categoryRegisterSchema.validate(req.body);
  
      // 2. if error in validation -> return error via middleware
      if (error) {
        return next(error)
      }

      const {title,image,slug,description} = req.body;
      
      try {
        

      const titleInUse = await Category.exists({ title });
  
        if (titleInUse) {
          const error = {
            status: 409,
            message: "Brand Already Exits!",
          };
  
          return next(error);
        }

        // read as buffer
        const buffer = Buffer.from(
          image.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
          "base64"
        );

        // allot a random name
        const imagePath = `${Date.now()}-${title}.png`;

        try {
         fs.writeFileSync(`storage/categories/${imagePath}`, buffer);
        } catch (error) {
          return next(error);
        }

    
          const categoryToRegister = new Category({
            title,
            image: imagePath,
            description,
            slug: slug
          });

    
         const category = await categoryToRegister.save();

        return res.status(200).json({status:200,msg:'Category Created Successfully!'});
    
        } catch (error) {
          return next(error);
        }
    },
    async UpdateCategory(req,res,next){

      // 1. validate user input
      const categoryUpdateSchema = Joi.object({
          title: Joi.string().max(30).required(),
          image: Joi.string().allow('').allow(null),
          description: Joi.string().required(),
          categoryId: Joi.string().required(),
          slug: Joi.string().required(),
        });
        const { error } = categoryUpdateSchema.validate(req.body);
    
        // 2. if error in validation -> return error via middleware
        if (error) {
          return next(error)
        }
  
        const {title,image,slug,description,categoryId} = req.body;
        
        try {
          if(!image === ''){
            // read as buffer
            const buffer = Buffer.from(
            image.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
            "base64"
          );
  
          // allot a random name
          const imagePath = `${Date.now()}-${title}.png`;
  
          try {
           fs.writeFileSync(`storage/categories/${imagePath}`, buffer);
          } catch (error) {
            return next(error);
          }
          const updatedSection = await Category.findByIdAndUpdate(
            categoryId,
            {title,image,slug,description},
            { new: true }
          );
        }else{
          const updatedSection = await Category.findByIdAndUpdate(
            categoryId,
            {title,slug,description},
            { new: true }
            );
          }

  
          return res.status(200).json({status:200,msg:'Category Updated Successfully!'});
      
          } catch (error) {
            return next(error);
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
    async GetCategoryById(req,res,next){
      const {id} = req.body;
  
      try{
        const category = await Category.find({_id:id});

          return res.status(200).json({status:200,category:category});
        }catch(error){
          return next(error)
        }
    }

}

module.exports = categoryController;