const express = require('express');
const [RunChangeQuery, RunGetQuery, sendQueryResultsback] = require('./../../DB_connection/RunQuery');
const Blog = express.Router();

// const fs = require("fs");

// http://localhost:5000/homepage/Blog?_start=0
Blog.get("/", (req, res)=>{
    let start = req.query._start;
    let limit = 8;
    let sql = `SELECT p.postId,g.postCoverImgUrl,p.postTitle,p.postDesc FROM posts p JOIN postCoverImg g ON p.postId=g.postId ORDER BY likeCount DESC LIMIT ${start},${limit}`;
    RunGetQuery(sql,res);
});


// http://localhost:5000/homepage/Blog/1
Blog.get("/:postId",(req, res)=>{
    let postID = req.params.postId;
    // res.setHeader("Content-Type","text/html");
    sendQueryResultsback(`SELECT postContent from posts WHERE postId='${postID}'`,(error, content)=>{
        if(error){
            console.log(error);
            res.send("<h1>errror ocurred.</h1>");
        } else{
            (content.length === 0) ? res.status(302).send("<h1>The post has been deleted/removed.</h1>") : res.send(content[0].postContent);
            // if(content.length === 0){
            //     res.status(302).send("<h1>The post has been deleted/removed.</h1>");
            // } else{
            //     res.send(test[0].postContent);
            // }

    }})


    // fs.readFile('./test.html',(err,data)=>{
    //     if(err){
    //         console.log(err);
    //         res.status(500).send("reading file error");
    //     } 
    //     res.status(200).send(data);
    // })
});




module.exports = Blog;
