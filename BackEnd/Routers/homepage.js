const express = require('express');
const mysql= require('mysql');
const homepage = express.Router();
const con= require('./../DB_connection/connection')
const [RunChangeQuery, RunGetQuery, sendQueryResultsback] = require('./../DB_connection/RunQuery');
const bodyParser = require('body-parser');
homepage.use(bodyParser.json());

const category = require('./../Sub Router/HomePage/Categories');
const post = require('./../Sub Router/HomePage/Post');
const Blog = require('./../Sub Router/HomePage/Blog');
homepage.use("/category",category);
homepage.use("/Post",post);
homepage.use("/Blog",Blog);

// http://localhost:5000/homepage
homepage.get("/",(req, res)=>{
    let start = req.query._start;
    let limit=8;
    let sql1 = `SELECT p.postId,g.postCoverImgUrl,p.postTitle,p.postDesc  FROM posts p
    JOIN postCoverImg g ON p.postId=g.postId
    ORDER BY likeCount DESC LIMIT 1`;

    sendQueryResultsback(sql1,(error, results)=>{
        if(error) {
            console.log(error);
            res.status(500).send("Internal Server Error.");
        } else{
            let mostliked = results;
            console.log(mostliked);
            let sql2 = ` SELECT p.postId,g.postCoverImgUrl,p.postTitle,p.postDesc,AVG(r.rating) FROM posts p 
            RIGHT JOIN postCoverImg g ON g.postId=p.postId
            JOIN ratings r ON p.postId = r.postId
            GROUP BY p.postId
            ORDER BY AVG(r.rating) DESC
            LIMIT 1`;
            sendQueryResultsback(sql2,(error1,mostRate)=>{
                if(error1){
                    console.log("error1",error1);
                    res.send("Internal server error").status(500);
                } else{
                    var mostRated = mostRate;
                    console.log(mostRate);
                    let sql3 = `SELECT p.postId,g.postCoverImgUrl,p.postTitle,p.postDesc  FROM posts p
                    JOIN postCoverImg g ON p.postId=g.postId
                    ORDER BY datePublished DESC LIMIT ${start},${limit}`;
                    sendQueryResultsback(sql3,(error2, postsView)=>{
                        if(error2){
                            console.log("error2",error2);
                            res.send("Internal server error").status(500);

                        } else{
                            var posts = postsView;
                            console.log(posts);
                            // let response = [...mostliked,...mostRated,...posts];
                            res.status(200).json({
                                mostLiked: mostliked[0],
                                mostRated: mostRated[0],
                                posts: posts
                            });
                            // res.send(response).status(200);
                        }
                    } )
                }
            })
        }
    })
})


module.exports = homepage;
