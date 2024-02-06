const express = require('express');
const mysql= require('mysql');
const category = express.Router();
const con= require('./../../DB_connection/connection')
const [RunChangeQuery, RunGetQuery, sendQueryResultsback] = require('./../../DB_connection/RunQuery');

const errorHandler = require('./../../Middlewares/ErrorHandlingMiddlewares/errorHandler');

// http://localhost:5000/homepage/category/categoryTitle?_start=0
category.get("/:cat",(req, res)=>{
    let catTitle = req.params.cat;
    let start = req.query._start;
    let limit = 8;
    sendQueryResultsback('SELECT categoryTitle AS Title FROM category',(error, categories)=>{
        if(error){
            console.log(error);
            
        } else {
            let checker = categories.map(categ => categ.Title===catTitle);
            if(checker.includes(true)){
                let sql = `SELECT p.postId,g.postCoverImgUrl,p.postTitle,p.postDesc FROM posts p JOIN postCoverImg g ON p.postId=g.postId JOIN category c ON (p.categoryId=c.categoryId)AND(c.categoryTitle='${catTitle}') LIMIT ${start},${limit}`;
                RunGetQuery(sql, res);
            } else{
                res.status(401).send("Kindly select the categories from the given list.");
            }
        }
    })
})

errorHandler;
module.exports = category;
