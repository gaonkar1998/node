// var counter = (arr) => {
//     return "array length is" + arr.length;
// }
// var addr = (a, b) => {
//     return `sum is  ${a + b}`;
// }
// var name = "akshata";
// module.exports = {
//     counter: counter,
//     addr: addr,
//     name: name
// }
// var port = process.env.PORT_N0;

// var server = http.createServer(function(req, res) {
// res.writeHead(200, { "Content-Type": "text/html" });
// res.end("<h2>Hey Devs</h2>");
// });
// app.get('/routeParam/:id',function(req,res){
//     console.log(req.params.id);
//     res.send('200',`hello your id is ${req.params.id}`);

// });
// app.get('/health',function(req,res){
//     res.send('200',"server is running");

// });
// app.get('/queryString/',function(req,res){
//     res.send('200',`query string passes is ${req.query.id}`);
//     console.log(req.query.id);
// });


// var functions=require('./count.js');
// var arr=[0,1,2,3,4];
// console.log(functions.counter(arr));
// console.log(functions.addr(50,50));
// console.log(functions.name);