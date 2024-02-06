const express = require('express');
const mysql = require('mysql');
const [RunChangeQuery, RunGetQuery, sendQueryResultsback] = require('../DB_connection/RunQuery');

authorChecker=(req, res, next)=>{
    let email = req.query.email;
    let sql = (email) ? `SELECT r.userId FROM registeredUser r JOIN roles a ON (r.roleId=a.roleId)AND(a.roleName='author') WHERE email='${email}'` : undefined;
    if(sql){
        sendQueryResultsback(sql, (error,authId)=>{
            if(error){
                console.log(error);
                res.status(500).send("Internal Server Error.");
            } else{
                if(authId.length===0){
                    let error = new Error("The user is not an author.");
                    error.status = 403;
                    next(error);
                } else{
                    console.log("author checker");
                    req.query.authId = authId[0].userId;
                    next();
                }
            }
        })
    }
}

module.exports = authorChecker;