const userService = require('../services/loginService');
const authService = require('../shared/auth.service');
const { validationResult } = require('express-validator');
var logger = require('../logger/logger');
// login validation
const loginuser = async (req, res) => 
{
    const error = validationResult(req);
    //if their are errors in the request print the errors
    if (!error.isEmpty()) 
    {
        logger.error(error);
        return res.status(401).json({ "error": error });
    }
    const loginUserData = await userService.loginUser(req, res);
    if (loginUserData.data.length) 
    {
        //generate token
        const userData = loginUserData.data[0];
        delete userData['password'];
        const token = authService.generateToken(userData);
        logger.info(`${200} - ${`loggedin successfully`} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return res.status(200).json({ "success": "Login success", "token": token });
    }
    else 
    {
        logger.error(`${error.status || 401} - ${`loggedin successfully`} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return res.status(401).json({ "error": "Invalid email or password" });
    }
}
module.exports =
{
    loginuser
}