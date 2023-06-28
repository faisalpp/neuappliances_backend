const JWTService = require('../services/JwtService');
const Admin = require('../models/admin');
const AdminDTO = require('../dto/admin');

const adminAuth = async (req,res,next) => {
  
   try{

    // refresh, access token validation

    const {refreshToken,accessToken} = req.cookies;
    
    if(!refreshToken || !accessToken){
        const error = {
            status: 401,
            message: 'Unauthorized'
        }

        return next(error);
    }

    let _id;

    try{
        _id = JWTService.verifyAccessToken(accessToken)._id;
    }catch(error){
        return next(error);
    }

    let admin;

    try{
        admin = await Admin.findOne({_id:_id});
    }catch(error){
        return next(error);
    }

    const AdminDto = new AdminDTO(admin);

    req.user = AdminDto;

    next();

   }catch(error){
    return next(error);
   }

}

module.exports = adminAuth;