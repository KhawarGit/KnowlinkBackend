const express = require('express');
const mysql = require('mysql');
const [RunChangeQuery, RunGetQuery, sendQueryResultsback] = require('./../DB_connection/RunQuery');
const likesAndViews = express.Router();
const bodyParser = require('body-parser');
likesAndViews.use(bodyParser.json());

likesAndViews.post("/likeAdd",(req, res)=>{
    let postId = req.body.postId;
    sql = `SELECT likeCount FROM posts WHERE postId=${postId}`;
    sendQueryResultsback(sql, (error, likes)=>{
        if(error){
            console.log(error);
            res.status(500).send("Internal Server Error.");
        } else{
            let newLike = likes[0].likeCount + 1;
            let sql1 = `UPDATE posts SET likeCount=${newLike} WHERE postId=${postId}`;
            RunChangeQuery(sql1);
            res.status(200).send("Like Incremented.");
        }
    })
})

likesAndViews.post("/likeDec",(req, res)=>{
    let postId = req.body.postId;
    sql = `SELECT likeCount FROM posts WHERE postId=${postId}`;
    sendQueryResultsback(sql, (error, likes)=>{
        if(error){
            console.log(error);
            res.status(500).send("Internal Server Error.");
        } else{
            if(likes[0].likeCount === 0){
                res.status(400).send("Likes are already 0.");
            } else{
            let newLike = likes[0].likeCount - 1;
            let sql1 = `UPDATE posts SET likeCount=${newLike} WHERE postId=${postId}`;
            RunChangeQuery(sql1);
            res.status(200).send("Like Incremented.");
            }
        }
    })
})

likesAndViews.post("/viewAdd",(req, res)=>{
    let postId = req.body.postId;
    sql = `SELECT viewCount FROM posts WHERE postId=${postId}`;
    sendQueryResultsback(sql, (error, views)=>{
        if(error){
            console.log(error);
            res.status(500).send("Internal Server Error.");
        } else{
            let newView = views[0].viewCount + 1;
            let sql1 = `UPDATE posts SET viewCount=${newLike} WHERE postId=${postId}`;
            RunChangeQuery(sql1);
            res.status(200).send("Views Incremented.");
        }
    })
})

module.exports = likesAndViews;