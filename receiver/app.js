const port = 8080
const bodyParser = require('body-parser');
const request = require('request-promise');
const mysql = require('mysql');
var express = require('express'),
app = express();

app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.render('login');
});

app.post('/home', (req, res) => {
    let requestBody = {
        method: "POST",
        uri: 'http://localhost:8090/auth',
        headers: {'content-type': 'application/json'},
        json: {
            username: 'placeholder',
            password: 'placeholder'
        }
    };

    let info = req.body
    console.log(info.username, info.password)
    requestBody.json['username'] = info.username
    requestBody.json['password'] = info.password
    request(requestBody, function (error, response, body) {
        if (response.statusCode == 201) {
            res.render('index')
        } else {
            res.send("<h1>Validation Failed.</h1><a href='/'>Retry</a>")
        }
    })
})

app.post('/add', function(req, res) {
    let fName = req.body.first_name
    let lName = req.body.last_name
    let grade = parseInt(req.body.grade)
    let favSubject = req.body.subject

    var con = mysql.createConnection({
        host: "localhost",
        user: "joe",
        password: "123",
        database: "school"
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = `INSERT INTO student_info (FirstName, LastName, Grade, Favorite_Subject) VALUES ("${fName}", "${lName}", "${grade}", "${favSubject}")`;
        con.query(sql, function (err, result) {
            if (err) {
                con.end(function(err) {})
                console.log("No records inserted");
            } else {
                console.log("1 record inserted");

                let requestBody2 = {
                    method: "POST",
                    uri: 'http://localhost:8110/compute',
                    headers: {'content-type': 'application/json'}
                };
            
                request(requestBody2, function (error, response, body) {
                    if (response.statusCode == 201) {
                        console.log("Stats updated")
                    } else {
                        console.log("Stats not updated.")
                    }
                })
            };
        });
        res.render('index')
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});