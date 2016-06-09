var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var EmailSender = require('./emailSender/emailSender');

app.use(express.static(path.join(__dirname+'/../../build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/sendEmail', function (req, res) {
	new EmailSender().sendEmail(req.body.name, req.body.email, req.body.content, res);
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/../../build/index.html'));
});

app.listen(process.env.PORT || 3000, function () {
  console.log('App started');
});