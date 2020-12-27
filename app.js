require('custom-env').env();



var http = require("http");

var express = require("express");

var app = express();

var bodyparser = require('body-parser');

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

app.use('/api', apiroutes);

app.use((req, res) => {
    res.status(404).json({
        message: `${req.url} not found`
    })
})

app.listen(port, () => {
    console.log("Server1 is running in port no " +port);
});