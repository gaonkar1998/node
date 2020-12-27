const sequilize = require('sequelize');
const db = require('../models/index');
const { get } = require('../routes');
// const user = require('../models/user');
const { Question } = db.sequelize.models;
const jwt_decode = require('jwt-decode');
const addquestion = async (req, res) => {

    // read the data from the input fields 
    const title = req.body.title;
    const type = req.body.type;
    const marks = req.body.marks;
    //find all users with the email repeated 

    getData = await Question.findAll({
        where: {
            title: title,
            type: type
        }
    });
    if (getData.length) {
        return { status: "error", message: "Question already exisits" }
    }

    // if no user with same email add that user to database 

    else {
        const createquestion = {
            title,
            type,
            marks
        }
        return { status: "success", data: await Question.create(createquestion) };
    }
};
const viewquestion = async (req, res) => {
    const header = req.headers.authorization;
    if (!header) {
        return { status: 401, message: 'enter token' }
    }
    var token = header.split(' ')[1];
    var userdetail = jwt_decode(token);
    var role = userdetail.role;
    console.log(role);
    if (role == 'admin') {
        getquestion = await Question.findAll({});
        if (getquestion.length) {
            return { status: 200, data: getquestion };
        }
        else {
            return { status: 401, message: "data not present" };
        }
    }
    else {
        return { status: 401, message: 'you have no permission' };
    }

}

module.exports = {
    addquestion,
    viewquestion
}
