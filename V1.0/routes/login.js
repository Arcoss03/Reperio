const express = require("express");
const router = express.Router();
const connection = require("../config/db");
const path = require("path");
const hashing = require("../config/hashing");
const session = require("express-session");

// Route d'accueil du login dont le submit redirige vers /auth
router.get("/", (req, res) => {
  res.render("login", { errors: req.session.errorLogin });
});

// Route de connexion
router.post("/auth", (req, res) => {
  //on vide l'erreur
  req.session.errorLogin = undefined;
  //on deconexte si il était deja conecté
  req.session.user = {};

  const email = req.body.email;
  const password = hashing(req.body.password);
  if (email && password) {
    //on verifie que le mot de passe et l email corespondent bien et existent dans la table candidat

    connection.execute(
      "SELECT * FROM candidat WHERE email_candidat = ? AND mdp_candidat = ?",
      [email, password],
      (error, results, fields) => {
        if (results.length > 0) {
          req.session.user.user_id = results[0].id_candidat;
          req.session.user.loggedin = true;
          req.session.user.email = email;
          req.session.user.name = `${results[0].prenom_candidat}-${results[0].nom_candidat}`;
          req.session.user.photo = results[0].chemin_cv_candidat;
          req.session.user.status = "candidat";
          console.log(`connexion au compte ${email} réussie`);
          //si la connexion est réussie on redirige vers /home donc l'app

          res.redirect("/home");
        } else {
          //sinon on repete la conexion dans la table entreprise
          //de cette facon je peu mettre en session si l'utilisateur est un candidat ou un recruteur

          connection.execute(
            "SELECT * FROM entreprise WHERE email_entreprise = ? AND mdp_entreprise = ?",
            [email, password],
            (error, results, fields) => {
              if (results.length > 0) {
                req.session.user.user_id = results[0].id_entreprise;
                req.session.user.loggedin = true;
                req.session.user.email = email;
                req.session.user.name = results[0].nom_entreprise;
                req.session.user.status = "entreprise";
                console.log(`connexion au compte ${email} réussie`);
                res.redirect("/home");
              } else {
                req.session.errorLogin = `Nom d\'utilisateur ou mot de passe incorrect!`;
                res.redirect("/");
              }
            }
          );
        }
      }
    );
  } else {
    req.session.errorLogin = `Veuillez saisir nom d'utilisateur et mot de passe!`;
    res.redirect("/");
  }
});

module.exports = router;
