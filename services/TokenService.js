const RefreshToken = require('../models/token');
const JWTService = require("../services/JwtService");

class TokenService {

    static async NewTokens(id){
        const refreshToken = JWTService.signRefreshToken({_id:id},'30m');
        const accessToken = JWTService.signAccessToken({_id:id},'60m');
    
        // update refresh token in database
        try {
          await RefreshToken.updateOne(
            {
              _id: id,
            },
            { token: refreshToken },
            { upsert: true }
          );
        } catch (error) {
          return next(error);
        }
    
        res.cookie('accessToken',accessToken,{httpOnly:true,maxAge: 24 * 60 * 60 * 1000});
        res.cookie('refreshToken',refreshToken,{httpOnly:true,maxAge: 24 * 60 * 60 * 1000});
    }

}

module.exports = TokenService;