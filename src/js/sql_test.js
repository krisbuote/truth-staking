const express = require('express');
const mysql = require('mysql');

// Create connection
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'kris',
  password : 'kb612',
  database : 'my_db',
  port     : 8888
});

// Connect
db.connect((err) => {
	if(err){
		throw err;
	}
	console.log("MySql connected...");
})


const app = express();

// Create database
app.get('/createdb', (request, response) => {
	let sql = 'CREATE DATABASE my_db';
	db.query(sql, (error, result) => {
		if(err) throw err;

		console.log(result);
		response.send('Database created...');
	});
})

app.listen('4000', () => {
	console.log("Server started on port 4000");
})