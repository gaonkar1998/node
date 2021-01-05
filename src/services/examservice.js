const db = require('../models/index');
const { Exam } = db.sequelize.models;
const jwt_decode = require('jwt-decode');
var logger = require('../logger/logger');
const getexams = async (req, res) => 
{
    const header = req.headers.authorization;
    if (!header) 
    {
        logger.error("enter the token generated")
        return { status: 401, message: 'enter token' }
    }
    // var token = header.split(' ')[1];
    // var userdetail = jwt_decode(token);
    // var role = userdetail.role;
    // console.log(role)
    var role = res.locals.user.role;
    if (role == 'admin') 
    {
        const getExam = await Exam.findAll({});
        if (getExam.length) 
        {
            logger.info(`${200} - ${`Provided exam details`} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            return { status: 200, data: getExam };
        }
        else 
        {
            logger.info("no exam deatils present in db")
            return { status: 401, message: "data not present" };
        }
    }
    else 
    {
        logger.error(`${401} - ${`No permission`} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return { status: 401, message: "you have no permission" };
    }
}

module.exports = 
{
    getexams
}
