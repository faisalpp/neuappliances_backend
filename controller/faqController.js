const FaqTab = require('../models/faqTab')
const Faq = require('../models/faq')
const Joi = require("joi");

const faqController = {
    async createFaqTab(req, res, next) {
      // 1. validate user input
    const faqTabSchema = Joi.object({
        title: Joi.string().max(30).required(),
      });
      const { error } = faqTabSchema.validate(req.body);
      console.log(error)
      // 2. if error in validation -> return error via middleware
      if (error) {
        return next(error)
      }

      const {title} = req.body;
      
      const slug = title.toLowerCase().replace(/\s/g,'-')
      try {

        const faqTabToRegister = new FaqTab({
            title,
            slug
          });

    
         const tab = await faqTabToRegister.save();

        return res.status(200).json({status:200,msg:'Faq Tab Created Successfully!'});
    
        } catch (error) {
          return next(error);
        }
        
    },
    async getFaqTab(req,res,next){
      try{
        const faqTabs = await FaqTab.find({});
        return res.status(200).json({status:200,faqTabs:faqTabs});
      }catch(error){
        return next(error)
      }
    },

    async updateFaqTab(req,res,next){

      // 1. validate user input
      const faqTabUpdateSchema = Joi.object({
          title: Joi.string().max(30).required(),
          _id: Joi.string().required(),
        });
        const { error } = faqTabUpdateSchema.validate(req.body);
    
        // 2. if error in validation -> return error via middleware
        if (error) {
          console.log(error)
          return next(error)
        }
        const {title,_id} = req.body;
        const slug = title.toLowerCase().replace(/\s/g,'-')
        try { 
          const updatedSection = await FaqTab.findByIdAndUpdate(
            _id,
            {title,slug},
            { new: true }
          );
  
          return res.status(200).json({status:200,msg:'Faq Tab Updated Successfully!'});
      
          } catch (error) {
            return next(error);
          }
      },

    async createFaq(req, res, next) {
        // 1. validate user input
      const faqSchema = Joi.object({
          question: Joi.string().required(),
          answer: Joi.string().required(),
          slug: Joi.string().required(),
        });
        const { error } = faqSchema.validate(req.body);
    
        // 2. if error in validation -> return error via middleware
        if (error) {
          return next(error)
        }
        
        const {answer,question,slug} = req.body;
        
        
        const faqTab = await FaqTab.find({slug:slug});
        
        if(!faqTab){
          const error = {
            message: "Faq Tab Not Found!",
            status: 404
          }
          return next(error)
        }
        try {
  
          const faqToRegister = new Faq({
              question,
              answer,
              tabId:faqTab[0]._id
            });
  
      
           const faq = await faqToRegister.save()
  
          return res.status(200).json({status:200,msg:'Faq Created Successfully!'});
      
          } catch (error) {
            return next(error);
          }
          
      },
      async getFaqs(req,res,next){
        const {slug} = req.body;
        let faqTabs = [];
        let faqs = [];
        try{
          faqTabs = await FaqTab.find({slug:slug});
          if(faqTabs.length === 0){
            const error = {
              message : "Faq Tab Not Found!",
              status: 404
            }
            return next(error)
          }
          
          faqs = await Faq.find({tabId: faqTabs[0]._id});
          
          return res.status(200).json({status:200,faqs:faqs});
        }catch(error){
          return next(error)
        }
      },
      async updateFaq(req,res,next){

      // 1. validate user input
      const faqTabUpdateSchema = Joi.object({
          question: Joi.string().required(),
          answer: Joi.string().required(),
          _id: Joi.string().required(),
        });
        const { error } = faqTabUpdateSchema.validate(req.body);
    
        // 2. if error in validation -> return error via middleware
        if (error) {
          return next(error)
        }
        const {question,answer,_id} = req.body;

        try { 
          const updatedSection = await Faq.findByIdAndUpdate(
            _id,
            {question,answer},
            { new: true }
          );
  
          return res.status(200).json({status:200,msg:'Faq Updated Successfully!'});
      
          } catch (error) {
            return next(error);
          }
      }

}

module.exports = faqController