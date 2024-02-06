const con = require('./connection');
const mysql = require('mysql');

//ENding the My SQL Connection
const terminate = (con) =>{
con.end();
// The event Handler will be executed whenever the MySQL connection with the server is closed.
con.on('end', () => {
    console.log("Connection Terminated with MySQL.");
});
};

module.exports = terminate;