require('custom-env').env();
const morgan = require('morgan');
var http = require("http");

var express = require("express");

var app = express();

var bodyparser = require('body-parser');

const swaggerjsDoc = require('swagger-jsdoc');

const logger = require('./src/logger/logger');

const swaggerUi = require('swagger-ui-express');
//read port from .env file
var port = process.env.PORT_N0;
app.server = http.createServer(app);

// set limit to data to be transfered 
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

// parse the request in json format 
var jsonparser = bodyparser.json();

app.use (jsonparser);

// redirect to routes if /api is used
const apiroutes = require('./src/routes/index');
app.use(morgan('dev'));

app.use('/api', apiroutes);

const swaggerOptions = {
    swaggerDefinition :{
        info :{
            title:"Testing Backend API ",
            description :"Documenataion for restful api",
            Servers:['http://localhost:5000'],
            version : '1.0.0',
        }
    },
    host: "localhost:5000",
    basePath: "/",
    schemes: ['http', 'https'],
    apis:['./src/routes/index.js'],
}
const swaggerDocs = swaggerjsDoc(swaggerOptions);
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
    logger.error(`${req.url} route not found`);
})
app.use((error, req, res, next) =>{
    logger.error(`${401} - ${`No route found`} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })
})
app.listen(port, () => {
    console.log("Server1 is running in port no " +port);
    logger.info(`${200} - ${`server running on port`} ${port}`);
});