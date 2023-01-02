const MongoClient = require('mongodb').MongoClient

// initial connection to the mongoDB, localhost replaced with 127.0.0.1 due to not connceting otherwise
MongoClient.connect('mongodb://127.0.0.1:27017')
    .then((client) => {
        db = client.db('employeesDB')
        coll = db.collection('employees')
        console.log("connection made")
    })
    .catch((error) => {
        console.log(error.message + " message from connection")
    })


    //find all method, this finds all data in the db and returns it to the index.js to be sent to the client
    var findAll = function () {
    return new Promise((resolve, reject) => {
        var cursor = coll.find()
        cursor.toArray()
            .then((documents) => {
                console.log("resolving : " + resolve)
                resolve(documents)
            })
            .catch((error) => {
                console.log("catching error : " + error)
                reject(error)
            })
    })
}

// finds the specified entry in the db based on the input id
var findByID = function(id) {
    return new Promise((resolve,reject) => {
        var curser = coll.find({_id : id})
        curser.toArray()
        .then((documents) => {
            console.log("resolving : " + resolve)
            resolve(documents)
        })
        .catch((error) => {
            console.log("catching error : " + error)
            reject(error)
        })
    })
}

// custom find and put created for the put request
var findByIDAndPut = function(id,phone,email){
    return new Promise((resolve, reject) => {
        coll.updateOne({_id:id},{$set : {phone:phone,email:email}})
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

//exported functions
module.exports = { findAll , findByID ,findByIDAndPut }