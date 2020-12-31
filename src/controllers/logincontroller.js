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
        logger.error("enter proper input fields");
        return res.status(401).json({ "error": error });
    }
    const loginUserData = await userService.loginUser(req, res);
    if (loginUserData.data.length) 
    {
        //generate token
        const userData = loginUserData.data[0];
        delete userData['password'];
        const token = authService.generateToken(userData);
        let response = res.send;
        res.send = function (data) {
        logger.info(JSON.parse(data));
        response.apply(res, arguments);
        }
        return res.status(200).json({ "success": "Login success", "token": token });
    }
    else 
    {
        return res.status(401).json({ "error": "Invalid email or password" });
    }
}
module.exports =
{
    loginuser
}