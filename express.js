const express = require('express');
const cors = require ('cors');
const bod =  require ('body-parser');
const app = express();
const path = require ('path');

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

app.get('/',function(req,res){
    res.send('WORKING')
})
    
app.get('/answer',function(req,res){
    res.sendFile(path.resolve(__dirname, "question.html"));
})
app.post('/answer/submit', function(req,res){
    console.log("test")
    let question={
        questionid:req.body.QUESTIONID,
        questions:req.body.QUEST,
        option1:req.body.OPTION1,
        option2:req.body.OPTION2,
        option3:req.body.OPTION3,
        answer:req.body.ANSWER,
        score:req.body.SCORE,
    }
    con.connect(function(err) {
        if (err){
             throw err;
        }
        console.log("Connected!");
           let sql = `INSERT INTO FIRST_TABLE( questions, score) VALUES ('${question.questions}', '${question.score}')
       `;  
        con.query(sql, function (err, result) {
            if (err){
                 throw err;
         }
            console.log("user added successfully");
            //res.send("user added successfully")
            sql =`
            INSERT INTO SECOND_TABLE(questionid, option1, option2, option3, answer) VALUES ('${result.insertId}','${question.option1}','${question.option2}','${question.option3}','${question.answer}')
            `;
            con.query(sql, function (err, result) {
                if (err){
                     throw err;
             }
                console.log("user added successfully");
                res.send("user added successfully")
        })
      
        })
            
    })

})
app.get('/get-questions',(req,res)=>{
    con.connect(function(){
        let sql = `SELECT * FROM FIRST_TABLE`
        
        con.query(sql, function (err, result) {
            if (err){
                 throw err;
         }
            res.send(result)
    })
    });
    })
 app.get("/reply",function(req,res){
    res.sendFile(path.resolve(__dirname,"clientside.html"))
 })

if(process.env.NODE_ENV === 'production'){
    app.listen();
}
else{
    const port = process.env.PORT || 8080;
    app.listen(8080, ()=>console.log(`server will be back shortly ${port}`));
}
