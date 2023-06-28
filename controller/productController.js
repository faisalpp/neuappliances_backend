const Category = require("../models/category");
const Joi = require("joi");
const fs = require("fs");

const productController = {
    async CreateCategory(req,res,next){

    // 1. validate user input
    const productRegisterSchema = Joi.object({
        title: Joi.string().max(30).required(),
        image: Joi.string().required(),
        slug: Joi.string().required(),
      });
      const { error } = productRegisterSchema.validate(req.body);
  
      // 2. if error in validation -> return error via middleware
      if (error) {
        return next(error)
      }

      const {title,image,slug} = req.body;
      
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
         fs.writeFileSync(`storage/products/${imagePath}`, buffer);
        } catch (error) {
          return next(error);
        }

    
          const productToRegister = new Category({
            title,
            image: imagePath,
            slug: slug
          });

    
         const category = await productToRegister.save();

        return res.status(200).json({status:200,msg:'Category Created Successfully!'});
    
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
    }

}

module.exports = categoryController;