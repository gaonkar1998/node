const db = require('../models/index');
const { Question } = db.sequelize.models;
const jwt_decode = require('jwt-decode');

const addquestion = async (req, res) => 
{
    // read the data from the input fields 
    const title = req.body.title;
    const type = req.body.type;
    const marks = req.body.marks;
    //find all users with the email repeated 
    const header = req.headers.authorization;
    if (!header) 
    {
        return { status: 401, message: 'enter valid bearer token' }
    }
    // var token = header.split(' ')[1];
    // var userdetail = jwt_decode(token);
    // var role = userdetail.role;
    var role = req.res.locals.user.role;
    if(role=='admin'){
        getData = await Question.findAll({
            where: {
                title: title,
                type: type
            }
        });
        if (getData.length) 
        {
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
    }
    else{
        return {status:"error", message:"You have no permisiion to add question"}
    }
};
//to display the added questions
const viewquestion = async (req, res) => 
{
    const header = req.headers.authorization;
    if (!header) 
    {
        return { status: 401, message: 'enter valid bearer token' }
    }
    // var token = header.split(' ')[1];
    // var userdetail = jwt_decode(token);
    // var role = userdetail.role;
    var role = req.res.locals.user.role;
    if (role == 'admin') 
    {
        const getquestion = await Question.findAll({});
        if (getquestion.length) 
        {
            return { status: 200, data: getquestion };
        }
        else 
        {
            return { status: 401, message: "data not present" };
        }
    }
    else 
    {
        return { status: 401, message: 'you have no permission' };
    }
}

module.exports = 
{
    addquestion,
    viewquestion
}
