const express = require('express');
const user = express.Router();
const mysql = require('mysql');
const con = require('../DB_connection/connection');
// const terminate = require('../DB_connection/terminateConenctionithMySQL');
const [RunChangeQuery, RunGetQuery,sendQueryResultsback] = require('../DB_connection/RunQuery');
// const checkAdmin = require('../Middlewares/AdminChecker');

const newCheckAdmin = require('../Middlewares/newAdminChecker');


const jwt = require('jsonwebtoken');
// const abc = require('../DB_connection/')
const ErrorHandler = require('../Middlewares/ErrorHandlingMiddlewares/errorHandler');

//adding session ID to the sessionId table , so that user wil not login again from the same Id.
const addSesionId = require('../AuthenticationAndAuthorization/revokedSessionIds');

const createJWT = require('../AuthenticationAndAuthorization/CreationOfJWT'); // Create the JWT for the user.
const isRegUser = require('./../Middlewares/RegUserChecker');
const bodyParser = require('body-parser');
const emailChecker = require('./../Middlewares/emailChecker');
const terminate = require('../DB_connection/terminateConenctionithMySQL');

user.use(bodyParser.json());
express.json();
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
        
        
        
// user.get("/", (req, res) => {
//     // console.log("Request mili.")
    
//     //Runnning first Query.
//     let sql = "SELECT * FROM registeredUser";
    
//     RunGetQuery(sql, res);

    
// })

// user.post("/:login", (req, res) => {
//     let email = req.query.email;
//     let password = req.query.password;
//     let sql = `SELECT a.userId,a.email,a.password,a.firstName,a.lastName,b.roleName FROM registeredUser a JOIN roles b ON ((a.roleId=b.roleId)AND(email='${email}'))`;
//     con.query(sql, (err, results) => {
//         if(err) throw err;
//         if(results.length !== 0){
//             if(results[0].email===email && results[0].password===password){
//                 console.log(results);

                
//                 res.json({
//                     status: "Successfully Logged In",
//                     token: createJWT(results)
//                 //    "token": jwt.sign({
//                 //         id: results[0].userId,
//                 //         name: results[0].firstName +" "+ results[0].lastName,
//                 //         role: results[0].roleName
//                 //     },jwtSecret, {expiresIn: '1d'}
//                 //     )
//                 })
//             } else {
//                 res.json({status: "failure: You are not a registered User. Try register yourself first."});
//             }
//         } else{
//             res.json({status: "failure"});
//         }
//     })
// });

// http://localhost:5000/user/Register
user.post("/Register", (req, res) => {
    let fn = req.body.firstName;
    let ln = req.body.lastName;
    let email = req.body.email;
    let pass = req.body.password;
    let userInfo = req.body.userInfo;
    let asAuthor = req.body.author;
    let sql = (fn&&ln&&email&&pass) ? (userInfo&&asAuthor) ? `INSERT INTO registeredUser (firstName, lastName, email, password,userInformation,roleId) VALUES('${req.body.firstName}', '${req.body.lastName}', '${req.body.email}', '${req.body.password}','${userInfo}',2)` : (userInfo) ? `INSERT INTO registeredUser (firstName, lastName, email, password,userInformation) VALUES('${req.body.firstName}', '${req.body.lastName}', '${req.body.email}', '${req.body.password}','${userInfo}')` : (asAuthor) ? `INSERT INTO registeredUser (firstName, lastName, email, password,roleId) VALUES('${req.body.firstName}', '${req.body.lastName}', '${req.body.email}', '${req.body.password}',2)` : `INSERT INTO registeredUser (firstName, lastName, email, password) VALUES('${req.body.firstName}', '${req.body.lastName}', '${req.body.email}', '${req.body.password}')` : undefined;
    (sql) ? RunChangeQuery(sql) : res.send(400).send("Kindly provide the required fields, fisrtName, lastName, email and password");
    res.status(200).send(`Successfully Added ${req.body.firstName} ${req.body.lastName} with email ${req.body.email}`);

});

user.post("/profilePic",emailChecker,(req, res)=>{
    let picSrc = req.body.src;
    let userId = req.body.Id;
    let sql = `INSERT INTO profileImg(userId,profImgUrl) VALUES (${userId},'${picSrc}')`;
    RunChangeQuery(sql);
    req.status(200).send("Successfully added the profile Image.");
})



user.put("/:ChangeInfoByEmail", (req, res) => {
    // let fn=false, ln=false, pass=false;
    // let fn = 
    // fn = req.query.firstName ?? false;

    
    // let fn=false, ln=false, pass=false;
    // if(req.query.firstName && req.query.firstName.trim().length !== 0){
    //     fn = true;
    // }
    
    // if(req.query.lastName && req.query.lastName.trim().length !== 0){
    //     ln = true;
    // }
    // if(req.query.password && req.query.password.trim().length !== 0){
        //     pass = true;
        // }
        
    let fn = (req.query.firstName && req.query.firstName.trim().length !== 0) ? true : false;
    let ln = (req.query.lastName && req.query.lastName.trim().length !== 0) ? true : false;
    let pass = (req.query.password && req.query.password.trim().length !== 0) ? true : false;
    let newEmail = (req.query.newEmail && req.query.newEmail.trim().length !== 0) ? true : false;
    
    let sql;


    // 16 combiinations NOTE: 1 is a null combination that is the else part which is setting the vaklue to undefined.
    sql = (fn && ln && pass && newEmail) ? `UPDATE registeredUser SET firstName='${req.query.firstName}',lastName='${req.query.lastName}',email='${req.query.newEmail}',password='${req.query.password}' WHERE email='${req.query.email}'` : (fn && ln && pass) ? `UPDATE registeredUser SET firstName='${req.query.firstName}',lastName='${req.query.lastName}',password='${req.query.password}' WHERE email='${req.query.email}'` : (fn && ln && newEmail) ? `UPDATE registeredUser SET firstName='${req.query.firstName}',lastName='${req.query.lastName}',email='${req.query.newEmail}' WHERE email='${req.query.email}'`: (fn && newEmail && pass) ? `UPDATE registeredUser SET firstName='${req.query.firstName}',email='${req.query.newEmail}',password='${req.query.password}' WHERE email='${req.query.email}'` : (newEmail && ln && pass) ? `UPDATE registeredUser SET lastName='${req.query.firstName}',email='${req.query.newEmail}',password='${req.query.password}' WHERE email='${req.query.email}'` : (fn&&ln) ? `UPDATE registeredUser SET firstName='${req.query.firstName}',lastName='${req.query.lastName}' WHERE email='${req.query.email}'` : (fn&&pass) ? `UPDATE registeredUser SET firstName='${req.query.firstName}',password='${req.query.password}' WHERE email='${req.query.email}'` : (ln&&pass) ? `UPDATE registeredUser SET lastName='${req.query.lastName}',password='${req.query.password}' WHERE email='${req.query.email}'` : (fn&&newEmail) ? `UPDATE registeredUser SET firstName='${req.query.firstName}',email='${req.query.newEmail}' WHERE email='${req.query.email}'` : (ln&&newEmail) ? `UPDATE registeredUser SET lastName='${req.query.lastName}',email='${req.query.newEmail}' WHERE email='${req.query.email}'` : (pass&&newEmail) ? `UPDATE registeredUser SET email='${req.query.newEmail}',password='${req.query.password}' WHERE email='${req.query.email}'` :(fn) ? `UPDATE registeredUser SET firstName='${req.query.firstName}' WHERE email='${req.query.email}'`  : (ln) ? `UPDATE registeredUser SET lastName='${req.query.lastName}' WHERE email='${req.query.email}'` : (pass) ? `UPDATE registeredUser SET password='${req.query.password}' WHERE email='${req.query.email}'` : (newEmail) ? `UPDATE registeredUser SET email='${req.query.newEmail}' WHERE email='${req.query.email}'` : undefined;

    (sql) ? RunChangeQuery(sql) : res.send("Error, Incorrect fields given.");
    if(sql){
        res.send("Successfully changed credentials.");
    }
    // if(fn && ln && pass){
    //     sql = `UPDATE registeredUser SET firstName='${req.query.firstName}',lastName='${req.query.lastName}',password='${req.query.password}' WHERE email='${req.query.email}'`;
    //     RunChangeQuery(sql);
    //     res.send("first Name , last Name and the apssword is changed.")
    // }else if(fn&&ln){
    //     sql = `UPDATE registeredUser SET firstName='${req.query.firstName}',lastName='${req.query.lastName}' WHERE email='${req.query.email}'`;
    //     RunChangeQuery(sql);
    //     res.send("first Name , last Name is changed.")
    // }else if(fn&&pass){
    //     sql = `UPDATE registeredUser SET firstName='${req.query.firstName}',password='${req.query.password}' WHERE email='${req.query.email}'`;
    //     RunChangeQuery(sql);
    //     res.send("first Name and the apssword is changed.")
    // }else if(ln&&pass){
        //     sql = `UPDATE registeredUser SET lastName='${req.query.lastName}',password='${req.query.password}' WHERE email='${req.query.email}'`;
    //     RunChangeQuery(sql);
    //     res.send("last Name and the apssword is changed.")
    // }else if(fn){
    //     sql = `UPDATE registeredUser SET firstName='${req.query.firstName}' WHERE email='${req.query.email}'`;
    //     RunChangeQuery(sql);
    //     res.send("first Name is changed.")
    // }else if(ln){
    //     sql = `UPDATE registeredUser SET lastName='${req.query.lastName}' WHERE email='${req.query.email}'`;
    //     RunChangeQuery(sql);
    //     res.send("last Name is changed.")
    // }else if(pass){
    //     sql = `UPDATE registeredUser SET password='${req.query.password}' WHERE email='${req.query.email}'`;
    //     RunChangeQuery(sql);
    //     res.send("password is changed.")
    // }else{
    //     res.send("Error Incorrect fields given.");
    // }



});

user.put("/ChangeUserInfo",(req, res)=>{
    let userId = req.body.userId
    let email = req.body.email;
    let userInfo = req.body.userInfo;
    let sql = (userId) ? `UPDATE registeredUser SET userInformation='${userInfo}' WHERE userId=${userId}` : (email) ? `UPDATE registeredUser SET userInformation='${userInfo}' WHERE email=${email}` : undefined;
    (sql) ? RunChangeQuery(sql) : res.status(400).send("User information is not provided.");
    res.status(200).send("User Information Changed.");
})

user.get("/logout", (req, res) => {
    // let token = req.body.token;
    // if(req.body.token){
    //     addSesionId(token);
    


    // revokedSessionIds.push(token);
    terminate();
    res.send("Successfully Logout.")
    
})
user.use(ErrorHandler);

module.exports = user;