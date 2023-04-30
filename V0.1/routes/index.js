const express = require("express");
const router = express.Router();
const connection = require("../config/db");
const path = require("path");
const hashing = require("../config/hashing");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });

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
            `le compte à bien été enregistré <a href="/"><button>retour à la page de connexion</button></a> ${req.file}`
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

// Route de test
router.get("/test", (req, res) => {
  res.send(hashing("admin"));
});

// Route d'accueil
router.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

// Route de register
router.get("/register", (req, res) => {
  res.sendFile("register.html", { root: "public" });
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
