const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const con = require('../DB_connection/connection');
const jwtSecret = "My Secret";
const createJWT = (results) => {
    return jwt.sign({
        id: results[0].userId,
        name: results[0].firstName +" "+ results[0].lastName,
        role: results[0].roleName
    },jwtSecret, {expiresIn: '1d'});

};

module.exports = createJWT;