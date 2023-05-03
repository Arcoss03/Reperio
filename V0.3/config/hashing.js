const bcrypt = require('bcryptjs');

//fonction de hashage
const hashing = (message) => {
    const salt = "$2a$10$fZ7RFp3XaYACD17LPfSDeO";
    const hash = bcrypt.hashSync(message, salt);
    return hash;
};

module.exports = hashing ;
