const mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "knowlink"
   
});
con.connect((err) => {
    if(err){
        console.log(err)
    }else{
    
    console.log("Database Connected.")
    }
});
module.exports = con;