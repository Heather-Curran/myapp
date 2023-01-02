//imports
var express = require('express') //importing express application
let ejs = require('ejs')
var app = express(); //app equals express framework
const bodyParser = require("body-parser");

var mySqlDAO = require('./mySqlDAO') //variable to reference this file
var detailsCounter = 0;
var serverCounter = 0;
var mongoDB = require('./MongoDB')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//setting the view engine
app.set('view engine', 'ejs')

//setting up the port for listening on
app.listen(3004, () =>{
    console.log("Listening on port 3004")
})  

// home page request
app.get('/home', (req, res) => {
    console.log("GET request on /about")
    console.log("Dir = ", __dirname)
    res.sendFile(__dirname + "/views/home.html") //Sends html file in views folder
})

// get request for the employees page for the mySQL server
// issues with connceting to the mySQL server hosted on Wampserver 
// data was not recognised and cound not discover why.
app.get('/employees', (req, res) => {
    mySqlDAO.getEmployees() //calling mySqlDAO file which calls getEmployees function
        .then((data) =>{ // if resolved
            res.render('employees', {"emp": data})
            res.send(data)
        })
        .catch((error) =>{ // if rejected
            res.send(error)
            console.log(error  + " : this is the error from index /nData found")
        })
    console.log("GET request on /employees")
    console.log("Dir = ", __dirname)
    //res.sendFile(__dirname + "/views/employees.ejs") //Sends html file in views folder
})

// get request for departments page. currently a blank html page
app.get('/departments', (req, res) => {
    console.log("GET request on /departments")
    console.log("Dir = ", __dirname)
    res.sendFile(__dirname + "/views/departments.html") //Sends html file in views folder
})

//get request for employeesMongo, this gives you a connection to the mongoDB hosted locally
//and displays all the data in a html table element.
app.get('/employeesMongo', (req, res) =>{
    console.log("get employeesmongo")
    mongoDB.findAll()
    .then((data) => {
        res.render('employeesMongo', {"emps": data})
        console.log("data found")
        //res.send(data)
    })
    .catch((error) => {
        console.log("data not found index.js")
        res.send(error)
    })
})

//get request for the addEmployeesMongo.ejs page for getting data from the user to add to the database
app.get('/employeesMongo/addEmployeesMongo',(req,res) => {
    console.log("get AddEmmployees Mongo")
    res.render('addEmployeeMongo')
})

// get request for the early update page that pulled the id from the url and used this to query that database for a 
// single entry based on the id found

// app.get('/update/:id', function(req, res) {
//     console.log("getting the id page : " + req.params.id);
//     mongoDB.findByID(req.params.id)
//     .then((data) => {
//         //res.send(data)
//         res.render('update', {"emp": data})
//         console.log("data found update/:id  : " + data)
//     })
//     .catch((error) => {
//         console.log("data not found index.js")
//         res.send(error)
//     })
// });

// put request created for attempting to replace data in the mongo db. issues with passing data from the client
// back to the server and into the db

// app.put("/employeesMongo/:id/:phone/:email",function(req,res){
//     console.log("putting the information on the db");
//     mongoDB.findByIDAndPut(req.params.id,req.params.phone,req.params.email)
//     .then((data) => {
//         //res.send(data)
//         res.render('/employeesMongo', {"emp": data})
//         console.log("data found update/:id  : " + data)
//     })
//     .catch((error) => {
//         console.log("data not found index.js")
//         res.send(error)
//     })
// })

// post request made for mongo db to try and pull data from the page using jquery script and receiving the data
// post was not fully constructed as data values kept returning undefined
app.post("/employeesMongo/addEmployeeMongo",function(req,res) {
    var _id = req.body.id;
    var _phone = req.body.phone;
    var _email = req.body.email;
    console.log("passed data : " + req.body.id + " : " + _phone + " : " + _email)

} );

//Redirects from '/home' to '/'
app.get('/', [counterFun], (req, res) => {
    detailsCounter++
    var d = new Date();
    console.log("Request on /details: " + detailsCounter + " from: " + req.hostname + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds())
    res.redirect('/home')
})
