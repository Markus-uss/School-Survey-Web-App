const port = 8100
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

app.post('/stats', function(req, res) {
    return null
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});