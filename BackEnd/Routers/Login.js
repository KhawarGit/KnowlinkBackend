const express = require('express');
const [RunChangeQuery, RunGetQuery, sendQueryResultsback] = require('./../DB_connection/RunQuery');
const login = express.Router();
const bodyParser = require('body-parser');
login.use(bodyParser.json());
const con = require('./../DB_connection/connection');


// http://localhost:5000/login 
login.post("/",(req, res)=>{
    
    let email = req.body.email;
    let pass = req.body.password;
    console.log(email, pass);
    let sql = `SELECT a.userId,a.email,a.password,a.firstName,a.lastName,b.roleName FROM registeredUser a JOIN roles b ON ((a.roleId=b.roleId)AND(email='${email}'))`;
    sendQueryResultsback(sql,(error,authenticationData)=>{
        if(error){
            console.log(error);
            res.status(500).send("Internal Server Error.");
        } else{
            console.log(authenticationData);
            if(authenticationData.length !== 0){
                if(authenticationData[0].email===email && authenticationData[0].password===pass){
                    res.status(200).json({
                        status: "Successfully Logged In",
                        role: authenticationData[0].roleName 
                    })
                } else{
                    res.status(400).json({
                        status: "failure",
                        message: "Kindly provide correct credentials."
                    });
                }
            } else{
                res.json({
                    status: "failure",
                    messsage : "User is not registered. or email is incorrect."
                })
            }
        }
    })
})

login.get("/AsGuest",(req, res)=>{
    res.status(200).json({
        status: "Not logged in",
        role: "Guest"
    });
});

module.exports = login;