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
//model for all the tables in database
/**
 * @swagger
 * definitions:
 *  register:
 *   type: object
 *   properties:
 *    first_name:
 *     type: string
 *     description: name of the employee
 *     example: 'admin'
 *    last_name:
 *     type: string
 *     description: name of the employee
 *     example: 'admin'
 *    email:
 *     type: string
 *     description: email of the employee
 *     example: 'admin@gmail.com'
 *    password:
 *     type: string
 *     description: password of the user
 *     example: '12345'
 *    role:
 *     type: string
 *     description: role of the user
 *     example: 'admin or student'
 *  login:
 *   type: object
 *   properties:
 *    email:
 *     type: string
 *     description: email of the user
 *     example: 'admin@gmail.com'
 *    password:
 *     type: string
 *     description: password of the user
 *     example: '12345'
 *  exams:
 *   type: object
 *   properties:
 *    exam_id:
 *     type: number
 *     description: id of exam
 *     example: '001'
 *    name:
 *     type: string
 *     description: exam details
 *     example: 'history'
 *    date:
 *     type: string
 *     description: date
 *     example: '20-nov'
 *    duration:
 *     type: string
 *     description: exam duartion
 *     example: '1hr'
 *    question_count:
 *     type: number
 *     description: number of question
 *     example: 'Student'
 *  question:
 *   type: object
 *   properties:
 *    title:
 *     type: string
 *     description: question title
 *     example: 'what is neurology'
 *    type:
 *     type: string
 *     description: type of question pattern
 *     example: 'MCQ or Descriptive'
 *    marks:
 *     type: number
 *     description: marks for each question
 *     example: '10'
 *  branch:
 *   type: object
 *   properties:
 *    branch_id:
 *     type: number
 *     description: Id of branch
 *     example: '001'
 *    name:
 *     type: string
 *     description: name of branch
 *     example: 'Information Science'
 *    capacity:
 *     type: number
 *     description: capacity of branch
 *     example: '50'
 */

//register swagger documentation for register
 /**
 * @swagger
 * /api/register:
 *    post:
 *      tags:
 *          - Register
 *      summary: This should create user based on role.
 *      consumes:
 *        -application/json                  
 *      parameters:
 *          - name: body
 *            in: body
 *            description: Register details
 *            required: true
 *            schema:
 *              $ref: '#/definitions/register'
 *      responses:
 *        200:
 *          description: registered successfull.
 *        400:
 *          description: registration unsuccessful.
 *        405:
 *          description: Invalid input.
 */

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
 /**
 * @swagger
 * /api/login:
 *    post:
 *      tags:
 *          - login
 *      summary: This should provide login to authorized user.
 *      consumes:
 *        -application/json                  
 *      parameters:
 *          - name: body
 *            in: body
 *            description: login credentials
 *            required: true
 *            schema:
 *              $ref: '#/definitions/login'
 *      responses:
 *        200:
 *          description: login successfull.
 *        400:
 *          description: login unsuccessful.
 *        405:
 *          description: Invalid input.
 */
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



 /**
 * @swagger
 * /api/addquestion:
 *    post:
 *      tags:
 *          - Question
 *      summary: This should add questions based on permission.
 *      consumes:
 *        -application/json                  
 *      parameters:
 *          - name: body
 *            in: body
 *            description: Question details
 *            required: true
 *            schema:
 *              $ref: '#/definitions/question'
 *          - in: header
 *            name: Authorization
 *            description: enter received token
 *            required: true
 *            type: string  
 *      responses:
 *        200:
 *          description: Added successfull.
 *        400:
 *          description: Question add unsuccessful.
 *        405:
 *          description: No permission.
 */
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

 /**
 * @swagger
 * /api/getquestion:
 *    get:
 *      tags:
 *          - Question
 *      summary: This should list the questions.
 *      consumes:
 *        -application/json  
 *      parameters:
 *          - in: header
 *            name: Authorization
 *            description: enter received token
 *            required: true
 *            type: string              
 *      schema:
 *         $ref: '#/definitions/question'
 *      responses:
 *        200:
 *          description: received user details successfull.
 *        400:
 *          description: error in receiving details.
 */
//route to get all registered users
routes.get('/getquestion', questioncontroller.fetchquestions);

 /**
 * @swagger
 * /api/getexams:
 *    get:
 *      tags:
 *          - Exams
 *      summary: This should list the exams.
 *      consumes:
 *        -application/json  
 *      parameters:
 *          - in: header
 *            name: Authorization
 *            description: enter received token
 *            required: true
 *            type: string              
 *      schema:
 *         $ref: '#/definitions/exams'
 *      responses:
 *        200:
 *          description: received exam details successfull.
 *        401:
 *          description: error in receiving exams.
 */
//route to get exams details
routes.get('/getexams', examscontroller.getexam);

 /**
 * @swagger
 * /api/getbranch:
 *    get:
 *      tags:
 *          - Branch
 *      summary: This should list the branch.
 *      consumes:
 *        -application/json  
 *      parameters:
 *          - in: header
 *            name: Authorization
 *            description: enter received token
 *            required: true
 *            type: string              
 *      schema:
 *         $ref: '#/definitions/branch'
 *      responses:
 *        200:
 *          description: received branch details successfull.
 *        400:
 *          description: error in receiving branch.
 *        401:
 *          description: unauthorized.
 */
//route to get branch details
routes.get('/getbranch', branchcontroller.getbranch);

//route to export the routes declared 
module.exports = routes;
