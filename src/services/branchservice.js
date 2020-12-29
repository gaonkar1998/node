const jwt_decode = require('jwt-decode');;
const db = require('../models/index');
const { Branch } = db.sequelize.models;

const getbranch = async (req, res) => 
{
    const header = req.headers.authorization;
    if (!header) 
    {
        return { status: 401, message: 'enter token' }
    }
    var token = header.split(' ')[1];
    var userdetail = jwt_decode(token);
    var role = userdetail.role;
    if (role == 'student') 
    {
        const getbranches = await Branch.findAll({});
        if (getbranches.length) 
        {
            return { status: 200, data: getbranches }
        }
        else 
        {
            return { status: 401, message: "data not present" }
        }
    }
    else 
    {
        return { status: 401, message: "you have no permission" }
    }

}
module.exports = {
    getbranch
}