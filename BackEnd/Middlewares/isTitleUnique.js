const express = require('express');
const mysql = require('mysql');
const [RunChangeQuery, RunGetQuery, sendQueryResultsback] = require('../DB_connection/RunQuery');

isUniqueTitle = (req, res, next) => {
    let title = req.query.title;
    let sql = (title) ? `SELECT postTitle from posts` : undefined;
    console.log("In uniqueness checker");
    if(sql){
        sendQueryResultsback(sql,(error,postTitles)=>{
            if(error){
                console.log(error);
                res.status(500).send("Internal server Error");
            } else{
                if(postTitles.map(post => post.postTitle).includes(title)){
                    let error = new Error("The post title must be unique. This title has already taken.");
                    error.status=302;
                    next(error);
                } else{
                    next();
                }
            }
        })
    }
}
module.exports = isUniqueTitle;