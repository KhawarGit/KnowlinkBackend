const express = require('express');

const [RunChangeQuery, RunGetQuery,sendQueryResultsback] = require('./../DB_connection/RunQuery');

emailChecker = (req, res, next) => {
    let email = req.body.email;
    let sql = `SELECT userId FROM registeredUser WHERE email='${email}'`;
    sendQueryResultsback(sql, (error, users)=>{
        if(error){
            console.log(error);
            req.send(500).send("Internal Server Error.");
        } else{
            if(users.length === 0){
                let error = new Error("The user is not logged in or registered yet.");
                error.status = 400;
                next(error);
            } else{
                req.body.Id = users[0].userId;
                next();
            }
        }
    })
}
module.exports = emailChecker;