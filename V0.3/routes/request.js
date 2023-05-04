const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const connection = require("../config/db");

router.use(bodyParser.json());

router.post("/bonjour", function (req, res) {
  const message = req.body.message;
  console.log("message:", message);
  if (message === "Bonjour") {
    res.send("Bonsoir");
  } else {
    res.send("Je ne comprends pas");
  }
});

router.post("/hello", function (req, res) {
  const message = req.body.message;
  console.log("message:", message);
  if (req.session.loggedin) {
    connection.query(message, (error, results, fields) => {
      if (results.length > 0) {
        res.send(results);
      } else {
        console.log("erreur, pas de resultats db");
      }
    });
  }
});

module.exports = router;
