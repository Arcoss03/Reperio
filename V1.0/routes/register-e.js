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
router.get("/register-e", (req, res) => {
  res.render("register-e", { errors: req.session.errors || {} });
});

//route de création de compte
router.post("/create-e", upload.single("photo"), (req, res) => {
  //on vide les erreurs stockées dans la session
  req.session.errors = {};
  console.log("etape1");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const email = req.body.email;
  const name = req.body.name;
  const password = hashing(req.body.password);
  const password2 = hashing(req.body.password2);

  if (password !== password2) {
    req.session.errors.password = "Les deux mots de passe ne correspondent pas";
  }

  if (!emailRegex.test(email)) {
    req.session.errors.email = "Adresse email invalide";
  }

  if (!name) {
    req.session.errors.firstname = "Le champ Prénom est obligatoire";
  }

  if (Object.keys(req.session.errors).length > 0) {
    // Supprimer le fichier uploadé en cas d'erreur
    deleteFile(req.file.path);
    // S'il y a des erreurs, on redirige vers la page de création de compte avec les erreurs
    return res.redirect("/register-e");
  }
  const fileExtension = path.extname(req.file.originalname);
  const fileName = `${name}_${Date.now()}${fileExtension}`;
  const filePath = path.join(__dirname, "../public/uploads", fileName);

  // Renommer le fichier avant de le sauvegarder
  fs.rename(req.file.path, filePath, (error) => {
    if (error) {
      // Supprimer le fichier uploadé en cas d'erreur
      deleteFile(req.file.path);
      // S'il y a une erreur, on redirige vers la page de création de compte avec un message d'erreur
      return res.redirect("/register-e");
    }

    connection.execute(
      `INSERT INTO entreprise (nom_entreprise, email_entreprise, mdp_entreprise, chemin_fiche_poste) VALUES (?, ?, ?, ?);`,
      [name, email, password, fileName],
      (error, results, fields) => {
        if (error) {
          // Supprimer le fichier uploadé en cas d'erreur
          deleteFile(filePath);
          // S'il y a une erreur, on redirige vers la page de création de compte avec un message d'erreur
          return res.redirect("/register-e");
        }
        //message de confirmation de création de compte
        console.log(`New user has been added -> ${email}, ${name}`);
        //on verifie que on est bien login

        res.render("success", { compte: email });
      }
    );
  });
});

module.exports = router;
