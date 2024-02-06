const mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "root", // Add your database username
    password: "123456", //Add your database password here.
    database: "knowlink" // Add your database name.
   
});
con.connect((err) => {
    if(err){
        console.log(err)
    }else{
    
    console.log("Database Connected.")
    }
});
module.exports = con;
