const sequilize = require('sequelize');
const db = require('../models/index');
const { get } = require('../routes');
// const user = require('../models/user');
const { User } = db.sequelize.models;
const registerUser = async (req, res) => {

    // read the data from the input fields 

    const email = req.body.email;
    const password = req.body.password;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const role = req.body.role;
    //find all users with the email repeated 

    getData = await User.findAll({
        where: { email: email }
    });
    if (getData.length) {
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
        return { status: "success" , data: await User.create(createUser)};
    }
};



module.exports = {
    registerUser
}
