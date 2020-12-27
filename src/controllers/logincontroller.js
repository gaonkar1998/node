const userService = require('../services/loginService');
const jwt_decode = require('jwt-decode');
const authService = require('../shared/auth.service');
const { validationResult } = require('express-validator');

// login validation
const loginuser = async (req, res) => {

    const error = validationResult(req);

    //if their are errors in the request print the errors
    if (!error.isEmpty()) {
        return res.status(401).json({ "error": error });
    }
    const loginUserData = await userService.loginUser(req, res);
    if (loginUserData.data.length) {
        //generate token
        const userData = loginUserData.data[0];
        // console.log(userData);
        delete userData['password'];
        const token = authService.generateToken(userData);
        // console.log("token is " + token);
        var decoded = jwt_decode(token);
        console.log(decoded.role);
        return res.status(200).json({ "success": "Login success", "token": token });
    }
    else {
        return res.status(401).json({ "error": "Invalid email or password" });
    }
}
module.exports = {
    loginuser
}