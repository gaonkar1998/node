const db = require('../models/index');
const { Exam } = db.sequelize.models;
const jwt_decode = require('jwt-decode');

const getexams = async (req, res) => 
{
    const header = req.headers.authorization;
    if (!header) 
    {
        return { status: 401, message: 'enter token' }
    }
    var token = header.split(' ')[1];
    var userdetail = jwt_decode(token);
    var role = userdetail.role;
    console.log(role)
    if (role == 'admin') 
    {
        const getExam = await Exam.findAll({});
        if (getExam.length) 
        {
            return { status: 200, data: getExam };
        }
        else 
        {
            return { status: 401, message: "data not present" };
        }
    }
    else 
    {
        return { status: 401, message: "you have no permission" };
    }
}

module.exports = 
{
    getexams
}
