const express = require("express");
const router = express.Router();
const connection = require("../config/db");
const path = require("path");
const hashing = require("../config/hashing");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });

// Route de test
router.get("/test", (req, res) => {
  res.send(hashing("admin"));
});

module.exports = router;
