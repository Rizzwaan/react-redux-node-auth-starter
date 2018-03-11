const express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    bodyParser = require('body-parser'),
    jsonwebtoken = require("jsonwebtoken"),
    Auth = require('./controller/AuthController');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Authentication Middleware
app.use(function (req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY, function (err, decode) {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

// Authentication Routes
app.post('/auth/register', Auth.register);
app.post('/auth/signin', Auth.signin);

// Secure Routes
app.get('/api/secureroute', );

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.listen(port);

console.log('Server started on: ' + port);
