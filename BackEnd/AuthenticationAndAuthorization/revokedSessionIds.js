
const mysql = require('mysql');
const con = require('../DB_connection/connection');

const addSesionId = (token)=> {
    let sql = `INSERT INTO sessionId VALUES('${token}')`;
    con.query(sql, (err) => {
        if(err) throw err;
        console.log("Successfully inserting session id.")
    });
};

module.exports = addSesionId;
