const express = require("express");
const router = express.Router();
const connection = require("../config/db");
const path = require("path");
const hashing = require("../config/hashing");

// Route d'accueil du login dont le submit redirige vers /auth
router.get("/", (req, res) => {
  res.sendFile("login.html", { root: "public" });
});

// Route de connexion
router.post("/auth", (req, res) => {
  const email = req.body.email;
  const password = hashing(req.body.password);
  if (email && password) {
    connection.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password],
      (error, results, fields) => {
        if (results.length > 0) {
          req.session.loggedin = true;
          req.session.email = email;
          req.session.firstname = results[0].firstname;
          req.session.surname = results[0].surname;
          req.session.photo = results[0].photo;
          res.redirect("/home");
        } else {
          res.send(
            `Nom d\'utilisateur ou mot de passe incorrect! <a href="/"><button>retour</button></a>`
          );
        }
      }
    );
  } else {
    res.send(
      `Veuillez saisir nom d'utilisateur et mot de passe! <a href="/"><button>Retour</button></a>`
    );
  }
});

// Route d'accès après connexion réussie
router.get("/home", (req, res) => {
  if (req.session.loggedin) {
    res.render("home", {
      firstname: req.session.firstname,
      surname: req.session.surname,
      photo: req.session.photo,
    });
  } else {
    res.redirect("/");
  }
});
module.exports = router;
