const express = require('express');
const mysql = require('mysql');

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    port: '8889',
    user: 'root',
    password: 'root',
    database: 'MVP-DB',
  });

// db.connect((err) => {
//     if (err){
//         throw err;
//     }
//     console.log('Mysql connected');
// });

app.listen('3000', () => {
    console.log("server started on port 3000");
});

app.get("/", (req, res) => {
  res.sendFile('public/user-choice.html',{ root: __dirname });
});

app.get("/candidat", (req, res) => {
    res.sendFile('public/candidat.html',{ root: __dirname });
});
app.get("/recruteur", (req, res) => {
    res.sendFile('public/recruteur.html',{ root: __dirname });
});