//include path to controller
var express = require("express");

const routes = express.Router();

const { body } = require('express-validator');

const userController = require("../controllers/userController");

const authService = require('../shared/auth.service');

const questioncontroller = require("../controllers/questioncontroller");

const examscontroller = require("../controllers/examcontroller");

const branchcontroller = require("../controllers/branchcontroller");

const logincontroller = require("../controllers/logincontroller");
// if the route is having register path validate for the data sent 
routes.post('/register',
    [
        body('email')
            .isEmail().withMessage("enter valid email")
            .not().isEmpty().withMessage("email cannot be empty"),

        body('password')
            .isLength({ min: 3 }).withMessage("length should be minumum 3")
            .not().isEmpty().withMessage("password cannot be empty"),

        body('first_name')
            .isAlpha().withMessage("name should be string")
            .not().isEmpty().withMessage(" first name cannont be empty"),

        body('last_name')
            .isAlpha().withMessage("name should be string")
            .not().isEmpty().withMessage("last name cannont be empty"),

        body('role')
            .isIn(['admin', 'student']).withMessage("role sholud be admin, client or resource")
            .not().isEmpty().withMessage("role cannot be empty")

    ],
    userController.registerUser);

//if the path imcludes add question routes 
routes.post('/addquestion',
    [
        body('title')
            .not().isEmpty().withMessage("title cannot be empty"),

        body('type')
            .isIn(['MCQ', 'Descriptive']).withMessage("Invalid type")
            .not().isEmpty().withMessage("type cannot be empty"),

        body('marks')
            .isNumeric({ min: 1, max: 10 }).withMessage("name should be string")
            .not().isEmpty().withMessage("marks cannont be empty"),

    ],
    questioncontroller.addquestions);

//if the path includes login route
routes.post('/login',
    [
        body('email')
            .isEmail().withMessage("enter valid email")
            .not().isEmpty().withMessage("email cannot be empty"),
        body('password')
            .not().isEmpty().withMessage("password cannot be empty")
    ],
    logincontroller.loginuser);

//route to get all registered users
routes.get('/getquestion', questioncontroller.fetchquestions);

//route to get exams details
routes.get('/getexams', examscontroller.getexam);

//route to get branch details
routes.get('/getbranch', branchcontroller.getbranch);

//route to export the routes declared 
module.exports = routes;
