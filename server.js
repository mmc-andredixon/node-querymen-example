const mongoose = require("mongoose");
const express = require("express");
const app = express();
const employees = require("./model");
const router = express.Router();
const port = 4000;

var querymen = require('querymen');


var uri = "mongodb://localhost:27017/my_work_place";

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
});

// Just for inserting a few records into the collection
router.route("/insertdata").post(function (req, res) {

    let faker = require('faker');

    let data = [];

    for (let index = 0; index < 400; index++) {
        data.push({
            employee_number: faker.finance.account(),
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            phone: faker.phone.phoneNumber(),
            email: faker.internet.email(),
            date_of_birth: faker.date.past(),
            city: faker.address.city(),
            country: faker.address.country(),
        });
    }



    // var data = [
    //     {
    //         name: "John",
    //         age: 21,
    //         location: "New York"
    //     },
    //     {
    //         name: "Smith",
    //         age: 27,
    //         location: "Texas"
    //     },
    //     {
    //         name: "Lisa",
    //         age: 23,
    //         location: "Chicago"
    //     },
    //     {
    //         name: "Brown",
    //         age: 21,
    //         location: "Jamaica"
    //     },
    //     {
    //         name: "Jack",
    //         age: 27,
    //         location: "Kitchener"
    //     },
    //     {
    //         name: "Lisa",
    //         age: 23,
    //         location: "Waterloo"
    //     },
    //     {
    //         name: "Victoria",
    //         age: 23,
    //         location: "Waterloo"
    //     },
    //     {
    //         name: "Stacie",
    //         age: 35,
    //         location: "Cambridge"
    //     },
    //     {
    //         name: "Nicholas",
    //         age: 32,
    //         location: "Waterloo"
    //     },
    //     {
    //         name: "Navi",
    //         age: 31,
    //         location: "London"
    //     },
    //     {
    //         name: "London",
    //         age: 31,
    //         location: "Toronto"
    //     },
    //     {
    //         name: "Pam",
    //         age: 37,
    //         location: "London"
    //     }
    // ];


    employees.insertMany(data, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

// Used to ensure there are records in the collection
router.route("/fetchdata").get(function (req, res) {
    employees.find({}, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

// Just setting a respone as the base url
router.route("/").get(function (req, res) {
    res.send('Hello World!')
});


// Letting querymen be aware of what the schema looks like
var schema = new querymen.Schema({
    sort: 'first_name',
    employee_number: {
        type: String
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    date_of_birth: {
        type: Date
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    date_of_birth_gte: {
        type: Date,
        paths: ['date_of_birth'],
        operator: '$gte'
    },
    date_of_birth_lte: {
        type: Date,
        paths: ['date_of_birth'],
        operator: '$lte'
    },
    name: {
        type: RegExp,
        paths: ['first_name', 'last_name'],
        bindTo: 'query' // default was 'query' (query|search)
    },
    location: {
        type: RegExp,
        paths: ['city', 'country'],
        bindTo: 'query' // default was 'query' (query|search)
    },
    term: {
        type: RegExp,
        paths: ['first_name', 'last_name', 'phone', 'email'],
        bindTo: 'query' // default was 'query' (query|search)
    },
});

// Creating an endpoint to query the employee collection
app.get('/employees', querymen.middleware(schema), function (req, res) {
    var query = req.querymen;

    employees.find(query.query, query.select, query.cursor).then(function (posts) {
        res.send({
            data: posts,
            meta: query.cursor
        })
    });
});


app.use("/", router);

app.listen(port, function () {
    console.log("Server is running on Port: " + port);
});