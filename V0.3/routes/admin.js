const express = require("express");
const router = express.Router();
const connection = require("../config/db");
const path = require("path");
const hashing = require("../config/hashing");
const bcrypt = require("bcryptjs");

// Route d'accueil
router.get("/", (req, res) => {
  res.sendFile("admin-login.html", { root: "public" });
});

// Route de connexion admin
router.post("/auth", (req, res) => {
  const username = req.body.username;
  const password = hashing(req.body.password);
  if (username && password) {
    connection.query(
      "SELECT * FROM admins WHERE username = ? AND password = ?",
      [username, password],
      (error, results, fields) => {
        if (results.length > 0) {
          req.session.loggedin = true;
          req.session.username = username;
          res.redirect("/admin/crud");
        } else {
          res.send(
            `Nom d\'utilisateur ou mot de passe incorrect! <a href="/admin"><button>retour</button></a>`
          );
        }
      }
    );
  } else {
    res.send(
      `Veuillez saisir nom d'utilisateur et mot de passe! <a href="/admin"><button>Retour</button></a>`
    );
  }
});

// Route d'accès après connexion réussie

router.get("/crud", (req, res) => {
  if (req.session.loggedin) {
    connection.query(
      "SELECT id, email, firstname, surname FROM users",
      (error, results, fields) => {
        if (error) throw error;
        res.render("crud", { users: results });
      }
    );
  } else {
    res.redirect("/");
  }
});

module.exports = router;
