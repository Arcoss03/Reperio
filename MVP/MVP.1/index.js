/*
pour demarrer le serveur faire la commande npm start ds le terminal 
dans l'emplacement du dossier MVP.1
le serveur ttourne sur le localhost 3000 par defaut
changer aussi les info de base de donnée comme port sur lequel tourne la db password ...
j'utilise phpmyadmin sur mamp pour faire tourner la db
*/

//******************************************************************* */

const express = require("express");
const mysql = require("mysql");

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  port: "8889",
  user: "root",
  password: "root",
  database: "db-mvp-projet",
});

const port = "3000";

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Mysql connected");
});

//on ouvre le serveur sur le port indiqué
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

//affichage fichier user-choice
app.get("/", (req, res) => {
  res.sendFile("public/user-choice.html", { root: __dirname });
});

app.get("/liste/recruteur", (req, res) => {
  db.query("SELECT name, description FROM recruteur", (err, results) => {
    if (err) throw err;
    //dataArray transforme le res de la requete sql en tableau d'objets https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
    let dataArray = JSON.parse(JSON.stringify(results));
    // variable html qui va etre send a la fin qui rpz le fichier html généré
    let html = "<ul>";
    //on boucle le nombre de fois qu'il y a d'objets ds le tableau resultat de la requette
    for (let i = 0; i < dataArray.length; i++) {
      html += `<li>${dataArray[i].name}</li>`;
      html += `<li>${dataArray[i].description}</li>`;
      html +=
        '<li><input type="checkbox" id="profil6" name="profil6" value="1"></li><br><br>';
    }
    html += "</ul>";
    html += '<a href="/"><button>Retour</button></a>';
    res.send(html);
  });
});

app.get("/liste/candidats", (req, res) => {
  db.query(
    "SELECT name, lastname, tel, certification, description FROM `candidat`",
    (err, results) => {
      if (err) throw err;
      let dataArray = JSON.parse(JSON.stringify(results));
      let html = "<ul>";
      for (let i = 0; i < dataArray.length; i++) {
        html += `<li>${dataArray[i].name}</li>`;
        html += `<li>${dataArray[i].lastname}</li>`;
        html += `<li>${dataArray[i].tel}</li>`;
        html += `<li>${dataArray[i].certification}</li>`;
        html += `<li>${dataArray[i].description}</li>`;
        html +=
          '<li><input type="checkbox" id="profil6" name="profil6" value="1"></li><br><br>';
      }
      html += "</ul>";
      html += '<a href="/"><button>Retour</button></a>';
      res.send(html);
    }
  );
});
