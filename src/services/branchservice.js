const jwt_decode = require('jwt-decode');
const db = require('../models/index');
const { Branch } = db.sequelize.models;
var logger = require('../logger/logger');
const getbranch = async (req, res) => 
{
    const header = req.headers.authorization;
    if (!header) 
    {
        logger.error("no auth token passed to access branch deatils");
        return { status: 401, message: 'enter token' }
    }
    // var token = header.split(' ')[1];
    // var userdetail = jwt_decode(token);
    var role = res.locals.user.role;
    if (role == 'student') 
    {
        const getbranches = await Branch.findAll({});
        if (getbranches.length) 
        {
            let response = res.send;
            res.send = function (data) {
            logger.info("successfully responded branch details");
            logger.info(JSON.parse(data));
            response.apply(res, arguments);
            }
            return { status: 200, data: getbranches }
        }
        else 
        {
            logger.info("no branch details present");
            return { status: 401, message: "data not present" }
        }
    }
    else 
    {
        logger.error("you have no permission to access branch");
        return { status: 401, message: "you have no permission" }
    }
}
module.exports = {
    getbranch
}