const userService = require('../services/userService');

const authService = require('../shared/auth.service');
const { validationResult } = require('express-validator');

const registerUser = async (req, res) => {

    // validate the sent request 
    const error = validationResult(req);

    //if their are errors in the request print the errors
    if (!error.isEmpty()) {
        return res.status(401).json({ "error": error });
    }

    // execute service file
    const registerUserData = await userService.registerUser(req, res);
    if (registerUserData.status == "error") {
        return res.status(401).json(registerUserData.message);
    }
    else if (registerUserData.status == "success") {
        return res.status(200).json(registerUserData.data);
    }
}

module.exports =
{
    registerUser,
    
}