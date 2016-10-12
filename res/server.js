/**
 * Created by Enzo on 06.10.2016.
 */
var express = require('express');
var bodyParser = require('body-parser');
const hostname = '127.0.0.1';
const port = 3001;

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./routes/noteRoutes.js'));
app.use(express.static(__dirname + '/res'));


app.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });