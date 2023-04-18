const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const path = require('path');
const hashing= require('../config/hashing');
const bcrypt = require('bcryptjs');

// Route d'accueil
router.get('/', (req, res) => {
    res.sendFile('admin-login.html', { root: 'public' });
});

router.get('/crud', (req, res) => {
    connection.query('SELECT id, email, firstname, surname FROM users', (error, results, fields) => {
      if (error) throw error;
      res.render('crud', { users: results });
    });
});
module.exports = router;
