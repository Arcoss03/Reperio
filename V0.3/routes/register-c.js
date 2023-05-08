const express = require("express");
const router = express.Router();
const connection = require("../config/db");
const path = require("path");
const hashing = require("../config/hashing");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

// Route de register dont le submit redirige vers /create
router.get("/register-c", (req, res) => {
  res.render("register-c", { errors: req.session.errors || {} });
});

//route de création de compte
router.post("/create-c", upload.single("photo"), (req, res) => {
  //on vide les erreurs stockées dans la session
  req.session.errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const email = req.body.email;
  const firstname = req.body.firstname;
  const surname = req.body.surname;
  const password = hashing(req.body.password);
  const password2 = hashing(req.body.password2);

  if (password !== password2) {
    console.log("lalalalalalal");
    req.session.errors.password = "Les deux mots de passe ne correspondent pas";
    console.log(req.session.errors.password, "testpass");
  }

  if (!emailRegex.test(email)) {
    req.session.errors.email = "Adresse email invalide";
  }

  if (!firstname) {
    req.session.errors.firstname = "Le champ Prénom est obligatoire";
  }

  if (!surname) {
    req.session.errors.surname = "Le champ Nom de famille est obligatoire";
  }

  if (Object.keys(req.session.errors).length > 0) {
    // Supprimer le fichier uploadé en cas d'erreur
    deleteFile(req.file.path);
    // S'il y a des erreurs, on redirige vers la page de création de compte avec les erreurs
    return res.redirect("/register-c");
  }

  const fileExtension = path.extname(req.file.originalname);
  const fileName = `${firstname}_${surname}_${Date.now()}${fileExtension}`;
  const filePath = path.join(__dirname, "../public/uploads", fileName);

  // Renommer le fichier avant de le sauvegarder
  fs.rename(req.file.path, filePath, (error) => {
    if (error) {
      // Supprimer le fichier uploadé en cas d'erreur
      deleteFile(req.file.path);
      // S'il y a une erreur, on redirige vers la page de création de compte avec un message d'erreur
      return res.redirect("/register-c");
    }

    connection.execute(
      `INSERT INTO candidat (email_candidat, mdp_candidat, prenom_candidat, nom_candidat, chemin_cv_candidat) VALUES (?, ?, ?, ?, ?);`,
      [email, password, firstname, surname, fileName],
      (error, results, fields) => {
        if (error) {
          // Supprimer le fichier uploadé en cas d'erreur
          deleteFile(filePath);
          // S'il y a une erreur, on redirige vers la page de création de compte avec un message d'erreur
          return res.redirect("/register-c");
        }
        console.log(
          `New user has been added -> ${email}, ${firstname}, ${surname}`
        );
        // res.send(
        //   `le compte ${email} à bien été enregistré <a href="/"><button>retour à la page de connexion</button></a>`
        // );
        res.render("success", { compte: email });
      }
    );
  });
});

module.exports = router;
