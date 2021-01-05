const db = require('../models/index');
const { Question } = db.sequelize.models;
const jwt_decode = require('jwt-decode');
var logger = require('../logger/logger');
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
        logger.error("no auth token passed to access branch deatils");
        return { status: 401, message: 'enter valid bearer token' }
    }
    // var token = header.split(' ')[1];
    // var userdetail = jwt_decode(token);
    // var role = userdetail.role;
    var role = res.locals.user.role;
    if(role=='admin'){
        getData = await Question.findAll({
            where: {
                title: title,
                type: type
            }
        });
        if (getData.length) 
        {
            logger.error(`question with title "${getData[0].title}" already exists`);
            return { status: "error", message: "Question already exisits" }
        }
        // if no user with same email add that user to database 
        else {
            const createquestion = {
                title,
                type,
                marks
            }
            logger.info(`${200} - ${`Added new question`} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            return { status: "success", data: await Question.create(createquestion) };
        }
    }
    else{
        logger.error(`${401} - ${`No permission`} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
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
    var role = res.locals.user.role;
    if (role == 'admin') 
    {
        const getquestion = await Question.findAll({});
        if (getquestion.length) 
        {
            let response = res.send;
            res.send = function (data) {
            logger.info(JSON.parse(data));
            response.apply(res, arguments);
            }
            return { status: 200, data: getquestion };
        }
        else 
        {
            return { status: 401, message: "data not present" };
        }
    }
    else 
    {
        logger.error(`${401} - ${`No permission`} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return { status: 403, message: 'you have no permission' };
    }
}

module.exports = 
{
    addquestion,
    viewquestion
}
