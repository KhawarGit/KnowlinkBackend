const express = require('express');
// const mysql = require('mysql');
const con = require('./DB_connection/connection');
const terminate = require('./DB_connection/terminateConenctionithMySQL');
// const [RunChangeQuery, RunGetQuery] = require('./DB_connection/RunQuery');
const cors = require('cors');
const bodyParser = require('body-parser');


const login = require('./Routers/Login');
const user = require('./Routers/user');
const admin = require('./Routers/admin');
const homepage = require('./Routers/homepage');
const comments = require('./Routers/comments');
const authorProfile = require('./Routers/authorProfile');
const likesAndViews = require('./Routers/likesAndviews');

let app = express();
app.use(express.json());
// Parse application/json
app.use(bodyParser.json());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/login",login);
app.use('/user',user);
app.use('/admin',admin);
app.use("/homepage",homepage);
app.use("/comments",comments);
app.use("/authorProfile",authorProfile);
app.use("/likesAndViews",likesAndViews);
// GET QUERY
// con.query(sql, (err, results) =>{
//     if(err) throw err;
//     res.send(results);
// })

// POSt , PUT, delete
// con.query(sql, (err) => {
//     if(err) throw err;
//     res.send()
// })


// app.get("/User", (req, res) => {
//     // console.log("Request mili.")
    
//     //Runnning first Query.
//     let sql = "SELECT * FROM registeredUser";
//     RunGetQuery(sql, res);

    
// })

// app.post("/:PostUser", (req, res) => {
//     let sql = `INSERT INTO registeredUser (firstName, lastName, email, password, registeredAt) VALUES('${req.query.firstName}', '${req.query.lastName}', '${req.query.email}', '${req.query.password}', '${req.query.registeredAt}')`;
//     RunChangeQuery(sql);
//     res.send(`Successfully Added ${req.query.firstName} ${req.query.lastName} with email ${req.query.email}`);

// })

// app.delete("/:Delete", (req, res) => {
//     let email = req.query.email;
//     sql = `DELETE FROM registeredUser WHERE email='${email}'`;
//     RunChangeQuery(sql);
//     res.send(`Successfully deleted the person with email ${email}`);

// })

// app.put("/:ChangeInfoByEmail", (req, res) => {
//     // let fn=false, ln=false, pass=false;
//     // let fn = 
//     // fn = req.query.firstName ?? false;


//     // let fn=false, ln=false, pass=false;
//     // if(req.query.firstName && req.query.firstName.trim().length !== 0){
//     //     fn = true;
//     // }
    
//     // if(req.query.lastName && req.query.lastName.trim().length !== 0){
//     //     ln = true;
//     // }
//     // if(req.query.password && req.query.password.trim().length !== 0){
//     //     pass = true;
//     // }

//     let fn = (req.query.firstName && req.query.firstName.trim().length !== 0) ? true : false;
//     let ln = (req.query.lastName && req.query.lastName.trim().length !== 0) ? true : false;
//     let pass = (req.query.password && req.query.password.trim().length !== 0) ? true : false;
//     let newEmail = (req.query.newEmail && req.query.newEmail.trim().length !== 0) ? true : false;
    
//     let sql;

//     sql = (fn && ln && pass && newEmail) ? `UPDATE registeredUser SET firstName='${req.query.firstName}',lastName='${req.query.lastName}',email='${req.query.newEmail}',password='${req.query.password}' WHERE email='${req.query.email}'` : (fn && ln && pass) ? `UPDATE registeredUser SET firstName='${req.query.firstName}',lastName='${req.query.lastName}',password='${req.query.password}' WHERE email='${req.query.email}'` : (fn && ln && newEmail) ? `UPDATE registeredUser SET firstName='${req.query.firstName}',lastName='${req.query.lastName}',email='${req.query.newEmail}' WHERE email='${req.query.email}'`: (fn && newEmail && pass) ? `UPDATE registeredUser SET firstName='${req.query.firstName}',email='${req.query.newEmail}',password='${req.query.password}' WHERE email='${req.query.email}'` : (newEmail && ln && pass) ? `UPDATE registeredUser SET lastName='${req.query.firstName}',email='${req.query.newEmail}',password='${req.query.password}' WHERE email='${req.query.email}'` : (fn&&ln) ? `UPDATE registeredUser SET firstName='${req.query.firstName}',lastName='${req.query.lastName}' WHERE email='${req.query.email}'` :(fn&&ln) ? `UPDATE registeredUser SET firstName='${req.query.firstName}',lastName='${req.query.lastName}' WHERE email='${req.query.email}'` : (fn&&pass) ? `UPDATE registeredUser SET firstName='${req.query.firstName}',password='${req.query.password}' WHERE email='${req.query.email}'` : (ln&&pass) ? `UPDATE registeredUser SET lastName='${req.query.lastName}',password='${req.query.password}' WHERE email='${req.query.email}'` : (fn&&newEmail) ? `UPDATE registeredUser SET firstName='${req.query.firstName}',email='${req.query.newEmail}' WHERE email='${req.query.email}'` : (ln&&newEmail) ? `UPDATE registeredUser SET lastName='${req.query.lastName}',email='${req.query.newEmail}' WHERE email='${req.query.email}'` : (pass&&newEmail) ? `UPDATE registeredUser SET email='${req.query.newEmail}',password='${req.query.password}' WHERE email='${req.query.email}'` :(fn) ? `UPDATE registeredUser SET firstName='${req.query.firstName}' WHERE email='${req.query.email}'`  : (ln) ? `UPDATE registeredUser SET lastName='${req.query.lastName}' WHERE email='${req.query.email}'` : (pass) ? `UPDATE registeredUser SET password='${req.query.password}' WHERE email='${req.query.email}'` : (newEmail) ? `UPDATE registeredUser SET email='${req.query.newEmail}' WHERE email='${req.query.email}'` : undefined;

//     (sql) ? RunChangeQuery(sql) : res.send("Error, Incorrect fields given.");
//     if(sql){
//         res.send("Successfully changed credentials.");
//     }
//     // if(fn && ln && pass){
//     //     sql = `UPDATE registeredUser SET firstName='${req.query.firstName}',lastName='${req.query.lastName}',password='${req.query.password}' WHERE email='${req.query.email}'`;
//     //     RunChangeQuery(sql);
//     //     res.send("first Name , last Name and the apssword is changed.")
//     // }else if(fn&&ln){
//     //     sql = `UPDATE registeredUser SET firstName='${req.query.firstName}',lastName='${req.query.lastName}' WHERE email='${req.query.email}'`;
//     //     RunChangeQuery(sql);
//     //     res.send("first Name , last Name is changed.")
//     // }else if(fn&&pass){
//     //     sql = `UPDATE registeredUser SET firstName='${req.query.firstName}',password='${req.query.password}' WHERE email='${req.query.email}'`;
//     //     RunChangeQuery(sql);
//     //     res.send("first Name and the apssword is changed.")
//     // }else if(ln&&pass){
//     //     sql = `UPDATE registeredUser SET lastName='${req.query.lastName}',password='${req.query.password}' WHERE email='${req.query.email}'`;
//     //     RunChangeQuery(sql);
//     //     res.send("last Name and the apssword is changed.")
//     // }else if(fn){
//     //     sql = `UPDATE registeredUser SET firstName='${req.query.firstName}' WHERE email='${req.query.email}'`;
//     //     RunChangeQuery(sql);
//     //     res.send("first Name is changed.")
//     // }else if(ln){
//     //     sql = `UPDATE registeredUser SET lastName='${req.query.lastName}' WHERE email='${req.query.email}'`;
//     //     RunChangeQuery(sql);
//     //     res.send("last Name is changed.")
//     // }else if(pass){
//     //     sql = `UPDATE registeredUser SET password='${req.query.password}' WHERE email='${req.query.email}'`;
//     //     RunChangeQuery(sql);
//     //     res.send("password is changed.")
//     // }else{
//     //     res.send("Error Incorrect fields given.");
//     // }



// })

app.get("/logout", (req, res) => {
    terminate(con);
    res.send("Logout Successful");
})
app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
    //Connecing MySQL server with the DB.
    
})

 
