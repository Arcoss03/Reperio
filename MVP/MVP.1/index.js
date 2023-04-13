const express = require('express');
const mysql = require('mysql');

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    port: '8889',
    user: 'root',
    password: 'root',
    database: 'db-mvp-projet',
  });

db.connect((err) => {
    if (err){
        throw err;
    }
    console.log('Mysql connected');
});

app.listen('3000', () => {
    console.log("server started on port 3000");
});

//affichage fichier user-choice
app.get("/", (req, res) => {
  res.sendFile('public/user-choice.html',{ root: __dirname });
});

app.get('/liste/recruteur', (req, res) => {
    db.query('SELECT name, description FROM recruteur', (err, results) => {
        if (err) throw err;
        let dataArray = JSON.parse(JSON.stringify(results));
        let html = '<ul>';
        for (let i = 0; i < dataArray.length; i++){
            html += `<li>${dataArray[i].name}</li>`;
            html += `<li>${dataArray[i].description}</li>`
            html += '<li><input type="checkbox" id="profil6" name="profil6" value="1"></li><br><br>'
        }
        html += '</ul>';
        html += '<a href="/"><button>Retour</button></a>'
        res.send(html);
    });
});

app.get('/liste/candidats', (req, res) => {
    db.query('SELECT name, lastname, tel, certification, description FROM `candidat`', (err, results) => {
        if (err) throw err;
        let dataArray = JSON.parse(JSON.stringify(results));
        let html = '<ul>';
        for (let i = 0; i < dataArray.length; i++){
            html += `<li>${dataArray[i].name}</li>`;
            html += `<li>${dataArray[i].lastname}</li>`;
            html += `<li>${dataArray[i].tel}</li>`;
            html += `<li>${dataArray[i].certification}</li>`
            html += `<li>${dataArray[i].description}</li>`
            html += '<li><input type="checkbox" id="profil6" name="profil6" value="1"></li><br><br>'
        }
        html += '</ul>';
        html += '<a href="/"><button>Retour</button></a>'
        res.send(html);
    });
});