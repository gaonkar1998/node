const db = require('../models/index');
const { User } = db.sequelize.models;
const bcrypt = require('bcrypt');
var logger = require('../logger/logger');
const registerUser = async (req, res) => 
{
    // read the data from the input fields 
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password,10);
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const role = req.body.role;
    //find all users with the email repeated 

    getData = await User.findAll({
        where: { email: email }
    });
    if (getData.length) {
        logger.error(`user with email "${getData[0].email}" already exists`);
        return { status: "error", message: "email should be unique" }
    }
    // if no user with same email add that user to database 
    else {
        const createUser = {
            email,
            password,
            first_name,
            last_name,
            role
        }
        logger.info("user with email "+email+" created successfully");
        return { status: "success" , data: await User.create(createUser)};
    }
};
module.exports = 
{
    registerUser
}
