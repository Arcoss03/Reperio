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

router.post("/request/getidtab", function (req, res) {
  const message = req.body.message;
  console.log("message:", message);
  let req_sql = "";
  if (message === "LISTE_ID") {
    if (req.session.user.status === "candidat") {
      req_sql =
        "SELECT entreprise.id_entreprise AS other_id, entreprise.chemin_fiche_poste AS photo FROM entreprise LEFT JOIN relation ON entreprise.id_entreprise = relation.id_entreprise AND relation.id_candidat = ? WHERE (relation.like_entreprise IS NULL AND relation.like_candidat IS NULL) OR (relation.like_candidat IS NULL AND relation.like_entreprise = 1)";
    } else if (req.session.user.status === "entreprise") {
      req_sql =
        "SELECT candidat.id_candidat AS other_id, candidat.chemin_cv_candidat AS photo FROM candidat LEFT JOIN relation ON candidat.id_candidat = relation.id_candidat AND relation.id_entreprise = ? WHERE (relation.like_entreprise IS NULL AND relation.like_candidat IS NULL) OR (relation.like_entreprise IS NULL AND relation.like_candidat = 1)";
    }
    if (req.session.user && req.session.user.loggedin) {
      connection.execute(
        req_sql,
        [req.session.user.user_id],
        (error, results, fields) => {
          if (results.length > 0) {
            res.send(results);
          } else {
            res.send(results);
            console.log("pas de resultats db");
          }
        }
      );
    }
  }
});

router.post("/request/like", function (req, res) {
  const message = req.body.message;
  let id_candidat = "";
  let id_entreprise = "";
  console.log("tab->");
  console.log(req.body);
  //on test si on est chez un candidat ou entreprise

  console.log("message:", message);
  //on test la bonne recetion du message ajax

  if (message === "IS_LIKED") {
    //on teste que l'utilisateur est bien conecté

    if (req.session.user && req.session.user.loggedin) {
      //on test si on est chez un candidat ou entreprise
      console.log(req.session.user.status);

      if (req.session.user.status === "candidat") {
        id_candidat = req.session.user.user_id;
        id_entreprise = req.body.other_id;
        req_sql =
          "INSERT INTO relation (id_candidat, id_entreprise, like_candidat) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE like_candidat = 1";
      } else if (req.session.user.status === "entreprise") {
        console.log("test1");
        id_candidat = req.body.other_id;
        id_entreprise = req.session.user.user_id;
        req_sql =
          "INSERT INTO relation (id_candidat, id_entreprise, like_entreprise) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE like_entreprise = 1";
      }
      //on insert le like dans la table relation ça marche pas pck je dois tester que ralation existe pas deja et si oui je dois juste update

      connection.execute(
        req_sql,
        [id_candidat, id_entreprise, 1],
        (error, results, fields) => {
          if (error) {
            console.log("erreur db");
          } else {
            console.log("profil update like");
            res.send("profil liké");
          }
        }
      );
      //on créé un match si id candidat et id entreprise sont liké mutuelement

      connection.execute(
        "SELECT * FROM `relation` WHERE id_candidat = ? AND id_entreprise = ?",
        [id_candidat, id_entreprise],
        (error, results, fields) => {
          if (results.length > 0) {
            if (
              results[0].like_candidat == 1 &&
              results[0].like_entreprise == 1
            ) {
              //on créé le match
              connection.execute(
                "INSERT INTO `match` (id_candidat, id_entreprise) VALUES (?, ?)",
                [id_candidat, id_entreprise]
              ),
                (error, results, fields) => {
                  console.log("macth créé");
                };
            }
          } else {
            console.log("pas de match créé");
          }
        }
      );
    }
  } else {
    res.send("Je ne comprends pas");
  }
});

router.post("/request/dislike", function (req, res) {
  const message = req.body.message;
  let id_candidat = "";
  let id_entreprise = "";
  console.log("tab->");
  console.log(req.body);
  //on test si on est chez un candidat ou entreprise

  console.log("message:", message);
  //on test la bonne recetion du message ajax

  if (message === "IS_DISLIKED") {
    //on teste que l'utilisateur est bien conecté

    if (req.session.user && req.session.user.loggedin) {
      //on test si on est chez un candidat ou entreprise
      console.log(req.session.user.status);

      if (req.session.user.status === "candidat") {
        id_candidat = req.session.user.user_id;
        id_entreprise = req.body.other_id;
        req_sql =
          "INSERT INTO relation (id_candidat, id_entreprise, like_candidat) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE like_candidat = 0";
      } else if (req.session.user.status === "entreprise") {
        console.log("test1");
        id_candidat = req.body.other_id;
        id_entreprise = req.session.user.user_id;
        req_sql =
          "INSERT INTO relation (id_candidat, id_entreprise, like_entreprise) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE like_entreprise = 0";
      }
      //on insert le like dans la table relation ça marche pas pck je dois tester que ralation existe pas deja et si oui je dois juste update

      connection.execute(
        req_sql,
        [id_candidat, id_entreprise, 0],
        (error, results, fields) => {
          if (error) {
            console.log("erreur db");
          } else {
            console.log("profil update dislike");
            res.send("profil disliké");
          }
        }
      );
    }
  } else {
    res.send("Je ne comprends pas");
  }
});

module.exports = router;
