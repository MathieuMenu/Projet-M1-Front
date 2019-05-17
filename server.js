
//Install express server

const express = require('express');

const path = require('path');

const bodyParser = require("body-parser")

const app = express();

// Serve only the static files form the dist directory

app.use(express.static(__dirname + '/dist/mmfront'));

app.use(bodyParser());
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true}));


app.use(function (req, res, next){
	res.setHeader('Access-Control-Allow-Origin', 'https://mmback.herokuapp.com');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
})

app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname+'/dist/mmfront/index.html'));

});

// Start the app by listening on the default Heroku port

app.listen(process.env.PORT || 8080);