const express = require('express');

const mysql = require('mysql');
const con = require('../DB_connection/connection');
// const terminate = require('../DB_connection/terminateConenctionithMySQL');
// const [RunChangeQuery, RunGetQuery] = require('../DB_connection/RunQuery');
const jwt = require('jsonwebtoken');
const jwtSecret = "My Secret";

express.json();
const newCheckAdmin = (req, res, next) => {

    let sessionIds;
    con.query("SELECT * FROM sessionId", (err, results) => {
        if(err) throw err;
        sessionIds = results.map(result => result.Id);
        console.log(sessionIds);
        console.log(sessionIds.includes(req.body.token));
        if(sessionIds.includes(req.body.token)){
            console.log("If chl rha hai.")
            let error = new Error("The token is expired.");
            error.status = 403;
            next(error);
        } else {
            jwt.verify(req.body.token, jwtSecret,  (err, decoded) => {

                if(err){
                        // res.json({status: "failure, You are not authenticated. Do login Again."});
                    let error = new Error("The jwt khatam hogya re.")
                    error.status = 403;
                    next(error);
        
                } else{
                    if(decoded.role === 'Admin'){
                        next();
                    } else{
                        const error = new Error("You are not the admin, ONlY Admin have the previliges to delete the user.");
                        error.status = 401;
                        next(error);
                    }
                        
                };  
            })
        }
    })
    console.log(sessionIds); // Yeh proble kr rha hai , bcz due to async nature, yeh line oehle chl rhi hai andd query ka result baad meia araha hai mere pass
    // to is liye yeh  humesha empty rehta tha and bcoz iski value pele check hoti thi , database se response aane se bhi pehle.

    // if(sessionIds.includes(req.body.token)){
    //     let error = new Error("The token is expired.");
    //     error.status = 403;
    //     next(error);
    // } else{
    
};

module.exports = newCheckAdmin;
