const express = require("express");
const router = express.Router();
const connection = require("../config/db");
const path = require("path");

// Route de test
// Route d'accès après connexion réussie
router.get("/home", (req, res) => {
  if (req.session.user && req.session.user.loggedin) {
    //console.log(req.session.user);
    res.render("home", {
      name: req.session.user.name,
    });
  } else {
    res.redirect("/");
  }
});

router.get("/home/match", (req, res) => {
  if (req.session.user && req.session.user.loggedin) {
    let req_sql = "";
    let user_id = req.session.user.user_id;
    if (req.session.user.status === "entreprise") {
      req_sql =
        "SELECT CONCAT(nom_candidat, '-', prenom_candidat) AS name, email_candidat AS email FROM `match` NATURAL JOIN candidat where id_entreprise = ?";
    } else if (req.session.user.status === "candidat") {
      req_sql =
        "SELECT nom_entreprise AS name, email_entreprise AS email FROM `match` NATURAL JOIN entreprise where id_candidat = ?";
    }

    connection.execute(req_sql, [user_id], (error, results, fields) => {
      if (error) {
        console.log("erreur db");
      } else {
        res.render("match", {
          match: results,
        });
      }
    });
  } else {
    res.redirect("/");
  }
});
module.exports = router;

router.get("/home/settings", (req, res) => {
  if (req.session.user && req.session.user.loggedin) {
    //console.log(req.session.user);
    // res.render("home", {
    //   name: req.session.user.name,
    // });
    res.sendFile(__dirname + "/../public/settings.html");
  } else {
    res.redirect("/");
  }
});
