const jwt = require ('jsonwebtoken');
const logger = require('../logger/logger');

const CONSTANTS = require('./constants');

const generateToken = userData =>
{
    const options = {
        expiresIn : CONSTANTS.JWT_TOKEN_EXPIRY,
        issuer: CONSTANTS.JWT_ISSUER
    }
    const token = jwt.sign(userData, CONSTANTS.JWT_SECRET_KEY,options);
    return token;
}
//authenticate the token
const validatetoken = (req,res, next) => 
{
    const authtoken = req.headers.authorization;
    if(authtoken){
        const token = authtoken.split(' ')[1];
        const options = {
            expiresIn : CONSTANTS.JWT_TOKEN_EXPIRY,
            issuer: CONSTANTS.JWT_ISSUER
        }
        try{
            result = jwt.verify(token,CONSTANTS.JWT_SECRET_KEY,options);
            res.locals.user = result;
            next();
        }
        catch(err){
            logger.error(`${401} - ${`Invalid token`} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            return res.status(401).json({"error":"token invalid"});
        }
    }
    else{
        logger.error(`${401} - ${`No token generated`} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return res.status(401).json({"error":"no token generated"});
    }
}

module.exports={
    generateToken,
    validatetoken
}