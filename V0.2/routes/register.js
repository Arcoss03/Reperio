const express = require("express");
const router = express.Router();
const connection = require("../config/db");
const path = require("path");
const hashing = require("../config/hashing");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });

let errors = {};

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

// Route de register dont le submit redirige vers /create
router.get("/register", (req, res) => {
  res.render("register", { errors: errors });
});

//route de création de compte
router.post("/create", upload.single("photo"), (req, res) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const email = req.body.email;
  const firstname = req.body.firstname;
  const surname = req.body.surname;
  const password = hashing(req.body.password);
  const password2 = hashing(req.body.password2);

  //on vide les erreurs
  errors = {};

  if (password !== password2) {
    errors.password = "Les deux mots de passe ne correspondent pas";
  }

  if (!emailRegex.test(email)) {
    errors.email = "Adresse email invalide";
  }

  if (!firstname) {
    errors.firstname = "Le champ Prénom est obligatoire";
  }

  if (!surname) {
    errors.surname = "Le champ Nom de famille est obligatoire";
  }

  if (Object.keys(errors).length > 0) {
    // Supprimer le fichier uploadé en cas d'erreur
    deleteFile(req.file.path);
    // S'il y a des erreurs, on redirige vers la page de création de compte avec les erreurs
    return res.redirect("/register");
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
      return res.redirect("/register");
    }

    connection.query(
      `INSERT INTO users (email, firstname, surname, password, photo) 
          VALUES ('${email}', '${firstname}', '${surname}', '${password}', '${fileName}');`,
      (error, results, fields) => {
        if (error) {
          // Supprimer le fichier uploadé en cas d'erreur
          deleteFile(filePath);
          // S'il y a une erreur, on redirige vers la page de création de compte avec un message d'erreur
          return res.redirect("/register");
        }
        console.log(
          `New user has been added -> ${email}, ${firstname}, ${surname}`
        );
        res.send(
          `le compte ${email} à bien été enregistré <a href="/"><button>retour à la page de connexion</button></a>`
        );
      }
    );
  });
});
module.exports = router;
