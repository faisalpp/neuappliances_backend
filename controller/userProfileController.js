const UserProfileDTO = require('../dto/profile')
const User = require("../models/user");
const RefreshToken = require('../models/token');
const JWTService = require("../services/JwtService");

const userProfileController = {
    
 // Get User Profile
 async getUserProfile(req,res,next) {
    
    const {_id} = req.body
    try {
      const user = await User.findOne({_id});
     if(!user){
       const error = {status: 401,message: "Invalid Credentials!"}
       return next(error);
     }

     const refreshToken = JWTService.signRefreshToken({_id:user._id},'30m');
     const accessToken = JWTService.signAccessToken({_id:user._id},'60m');
 
     // update refresh token in database
     try {
       await RefreshToken.updateOne(
         {
           _id: user._id,
         },
         { token: refreshToken },
         { upsert: true }
       );
     } catch (error) {
       return next(error);
     }
 
     res.cookie('accessToken',accessToken,{httpOnly:true,maxAge: 24 * 60 * 60 * 1000});
     res.cookie('refreshToken',refreshToken,{httpOnly:true,maxAge: 24 * 60 * 60 * 1000});

     const userDto = new UserProfileDTO(user);
     return res.status(200).json({status:200,user: userDto,msg:'Login Successful!',auth:true});

    } catch (error) {
        return next(error);
    }
 },

 async UpdateProfile(req,res,next){
    const {_id,firstName,lastName,email,country} = req.body;
    try {
      
      const updateUser = await User.findByIdAndUpdate(
        _id,
        { firstName, lastName ,email, country},
        { new: true }
        );

        if(!updateUser){
          const error = {status: 401,message: "Invalid Credentials!"}
          return next(error);
        }

        const refreshToken = JWTService.signRefreshToken({_id:_id},'30m');
        const accessToken = JWTService.signAccessToken({_id:_id},'60m');
    
        // update refresh token in database
        try {
          await RefreshToken.updateOne(
            {
              _id: _id,
            },
            { token: refreshToken },
            { upsert: true }
          );
        } catch (error) {
          return next(error);
        }
    
        res.cookie('accessToken',accessToken,{httpOnly:true,maxAge: 24 * 60 * 60 * 1000});
        res.cookie('refreshToken',refreshToken,{httpOnly:true,maxAge: 24 * 60 * 60 * 1000});

        return res.status(200).json({status:200,msg:'User Profile Updated!'});

    } catch (error) {
      return next(error);
    }

 },

}



module.exports = userProfileController;