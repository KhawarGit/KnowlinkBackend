const express = require('express');
const mysql = require('mysql');
const [RunChangeQuery,RunGetQuery, sendQueryResultsback] = require('./../DB_connection/RunQuery');

categoryChecker = (req, res, next) =>{
    let catTitle= req.query.catTitle;
    console.log("In category Checker.");
    sendQueryResultsback(`SELECT categoryId FROM category WHERE categoryTitle='${catTitle}'`,(error,catId)=>{
        console.log("in functin")
        if(error){
            console.log(error);
            res.status(500).send("Internal Server error.");
            next(error);
        } else{
            if(catId.length===0){
                console.log("error dene aaya.");
                let error1 = new Error("The category is not present in the database, kindly select one from the options.");
                error1.status = 401;
                next(error1);

            } else{
                console.log("jaane de rha.");
                req.query.catId = catId[0].categoryId;
                console.log(catId);
                console.log(req.catId);
                next();
                console.log("abhi bhi yhi h");
            }
        }
    })

};
module.exports = categoryChecker;