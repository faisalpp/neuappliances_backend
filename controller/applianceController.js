const Category = require("../models/category");
const Product = require("../models/product");
const categorySection = require("../models/categorySection");
const sectionItem = require("../models/sectionItem");

const applianceController = {
    async GetAppliances(req,res,next){
      try{
        const categories = await Category.find({});
        return res.status(200).json({status:200,categories:categories});
      }catch(error){
        return next(error)
      }      
    },
    async GetApplianceSections(req,res,next){
      const {categoryId} = req.body;
      const category = await Category.findOne({_id:categoryId})
      
      categorySection.find({ categoryId: categoryId })
      .populate('sectionItemsId')
      .exec()
      .then(categorySections => {
        // categorySections will contain an array of CategorySection documents
        console.log(category)
        return res.status(200).json({status:200,categorySections:categorySections,categoryDescription:category.description,categoryTitle:category.title});
      })
      .catch(err => {
        return res.status(500).json({status:500,msg:"Internal Server Error!"});
      });

    },
    async GetApplianceBySlug(req,res,next){
      const {slug} = req.body;
      try{
        const product = await Product.findOne({slug:slug});
        return res.status(200).json({status:200,product:product});
      }catch(error){
        return next(error)
      }      
    },
    async GetApplianceBySectionType(req,res,next){
      const {category,type,value} = req.body;
      const query = {category}
      try{

        switch(type){
          case 'cosmatic-rating':
           query.rating = value;
           break;
          case 'types':
            query.type = value;
            break
          case 'features':
            query.feature = value;
            break;
          case 'brands':
            query.brand = value;
            break
          case 'colors':
            query.color = value;
            break
          case 'fuel-type':
            query.fuelType = value;
            break
        }

        
        const products = await Product.find(query);
        return res.status(200).json({status:200,products:products});
        
      }catch(error){
        return next(error)
      }      
    }

}

module.exports = applianceController;