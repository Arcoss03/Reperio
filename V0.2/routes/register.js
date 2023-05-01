const express = require("express");
const router = express.Router();
const connection = require("../config/db");
const path = require("path");
const hashing = require("../config/hashing");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });

// Route de register dont le sumbit redirige vers /create
router.get("/register", (req, res) => {
  res.sendFile("register.html", { root: "public" });
});

//route de creation de compte
router.post("/create", upload.single("photo"), (req, res) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const email = req.body.email;
  const firstname = req.body.firstname;
  const surname = req.body.surname;
  const password = hashing(req.body.password);
  const password2 = hashing(req.body.password2);

  if (
    password === password2 &&
    emailRegex.test(email) &&
    firstname &&
    surname
  ) {
    const fileExtension = path.extname(req.file.originalname);
    const fileName = `${firstname}_${surname}_${Date.now()}${fileExtension}`;
    const filePath = path.join(__dirname, "../public/uploads", fileName);

    // Renommer le fichier avant de le sauvegarder
    fs.rename(req.file.path, filePath, (error) => {
      if (error) throw error;

      connection.query(
        `INSERT INTO users (email, firstname, surname, password, photo) 
            VALUES ('${email}', '${firstname}', '${surname}', '${password}', '${fileName}');`,
        (error, results, fields) => {
          if (error) throw error;
          console.log("New user has been added");

          res.send(
            `le compte à bien été enregistré <a href="/"><button>retour à la page de connexion</button></a>`
          );
        }
      );
    });
  } else {
    res.send(
      `email invalide ou mot de passe incorect <a href="/register"><button>retour</button></a>`
    );
  }
});

module.exports = router;
