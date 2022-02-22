const port = 8100
const bodyParser = require('body-parser');
const request = require('request-promise');
const mysql = require('mysql');
var MongoClient = require('mongodb').MongoClient;
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
        uri: 'http://auth_service:8090/auth',
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
            var url = "mongodb://moe:123@mongo_db:27017/?authSource=admin";

            MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("school_info");
            // dbo.collection("computed_stats").findOne({}, function(err, result) {
            //     if (err) throw err;
            //     console.log(result.name);
            //     res.send(result)
            //     db.close();
            //     });
            // });
            var sort_query = { _id: -1 }
            dbo.collection("computed_stats").find().sort(sort_query).toArray(function(err, result) {
                if (err) throw err;
                console.log(result[0]);
                res.send(`<h2>${JSON.stringify(result[0])}</h2>`)
                db.close();
                });
            });
        } else {
            res.send("<h1>Validation Failed.</h1><a href='/'>Retry</a>")
        }
    })
})

app.post('/stats', function(req, res) {
    return null
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});