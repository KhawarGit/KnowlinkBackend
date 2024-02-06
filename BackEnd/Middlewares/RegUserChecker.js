const express = require('express');
const  [RunChangeQuery, RunGetQuery, sendQueryResultsback]  = require('./../DB_connection/RunQuery');
const mysql = require('mysql');
isRegUser = (req, res, next) => {
    let checker = req.query.userId || req.body.email;
    sendQueryResultsback(`SELECT userId FROM registeredUser WHERE userId=${checker}`,(error, result)=>{
        if(error){
            console.log(error);
            res.status(500).send("Internal Server error.");
        } else{
            if(result.length === 0){
                let error1 = new Error("The user is not logged in.");
                error1.status = 403;
                next(error1);
            } else{
                console.log("OK regUser.");
                next();
            }
        }
    })
}

module.exports = isRegUser;