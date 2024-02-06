const express = require('express');
const authorProfile = express.Router();
const [RunChangeQuery, RunGetQuery, sendQueryResultsback] = require('./../DB_connection/RunQuery');
const user = require('./user');

// http://localhost:5000/authorProfile/UserInfo?userId=3
//MIdleware for checking Image of author exists or not.
authorProfile.get("/UserInfo",(req, res)=>{
    let userId = req.query.userId;
    let sql = `SELECT CONCAT(r.firstName,' ',r.lastName) AS userName, r.userInformation, p.profImgUrl FROM registeredUser r JOIN profileImg p ON (r.userId=p.userId)AND(r.userId=${userId})`;
    RunGetQuery(sql,res);
})

// http://localhost:5000/authorProfile/Statistics?userId=3
authorProfile.get("/Statistics",(req, res)=>{
    let userId = req.query.userId;
    let sql1 = `select COALESCE(AVG(r.rating),0.00) AS RatingAvg from ratings r JOIN posts p ON (r.postId=p.postId)AND(p.userId=${userId})`;
    sendQueryResultsback(sql1,(error,avgRating)=>{
        if(error){
            console.log(error);
            res.status(500).send("Internal Server Error.");
        } else{
            let Rating = avgRating[0].ratingAvg.toFixed(2);
            let sql = `SELECT p.postId,p.postTitle,c.categoryTitle AS postCategory,p.viewCount,p.likeCount FROM posts p JOIN category c ON p.categoryId=c.categoryId WHERE userId=${userId} ORDER BY postId`;
            sendQueryResultsback(sql,(error1,posts)=>{
                if(error1){
                    console.log(error1);
                    res.status(500).send("Internal Server Error.");
                } else{
                    res.status(200).json({
                        "Average Rating": Rating,
                        TotalPostCount: posts.length,
                        records: posts
                    });
                }
            })
        }
    })
})

module.exports = authorProfile;