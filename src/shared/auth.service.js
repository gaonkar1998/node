const jwt = require ('jsonwebtoken');

const CONSTANTS = require('./constants');

const generateToken = userData =>{
    const options = {
        expiresIn : CONSTANTS.JWT_TOKEN_EXPIRY,
        issuer: CONSTANTS.JWT_ISSUER
    }
    const token = jwt.sign(userData, CONSTANTS.JWT_SECRET_KEY,options);
    // console.log(token);
    return token;
}

//authenticate the token
const validatetoken = (req,res, next) => {
    const authtoken = req.headers.authorization;
    // console.log(authtoken);
    if(authtoken){
        const token = authtoken.split(' ')[1];
        // console.log(token);
        const options = {
            expiresIn : CONSTANTS.JWT_TOKEN_EXPIRY,
            issuer: CONSTANTS.JWT_ISSUER
        }
        try{
            result = jwt.verify(token,CONSTANTS.JWT_SECRET_KEY,options);
            // console.log(result);
            res.locals.user = result;
            next();
        }
        catch(err){
            return res.status(401).json({"eror":"token expired"});
        }
    }
    else{
        return res.status(401).json({"error":"no token generated"});
    }
}

module.exports={
    generateToken,
    validatetoken
}