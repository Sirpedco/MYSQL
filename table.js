const express = require('express');
const cors = require ('cors');
const bod =  require ('body-parser');
const app = express();
const path = require ('path');
;
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));
app.use(bod());

var mysql = require('mysql');

var con = mysql.createConnection(
    {
        host: "localhost",
        user:"root",
        password:"",
        database: "peace"
    });
    
con.connect(function(err){
    if (err) throw err
    console.log("Connected!")
    var sql = `CREATE TABLE FIRST_TABLE(questionid int AUTO_INCREMENT, questions varchar(255), score int, PRIMARY KEY(questionid))`;
    
    con.query(sql, function (err, result) {
      if (err) throw err;
        console.log("Table created")
    });
   var sql= `CREATE TABLE SECOND_TABLE(id int AUTO_INCREMENT NOT NULL , questionid int, option1 text, option2 text, option3 text, answer int, PRIMARY KEY(id), FOREIGN KEY(questionid) REFERENCES FIRST_TABLE(questionid))`;
    con.query(sql, function (err, result) {
      if (err) throw err;
        console.log("Table2 created")
    });
})