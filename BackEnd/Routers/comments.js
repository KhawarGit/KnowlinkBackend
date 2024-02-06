const express = require('express');
const mysql = require('mysql');
const [RunChangeQuery, RunGetQuery, sendQueryResultsback] = require('./../DB_connection/RunQuery');
const isRegUser = require('./../Middlewares/RegUserChecker');
const isNullcomment = require('./../Middlewares/isNULL');
const comments = express.Router();

const errorHandler = require('./../Middlewares/ErrorHandlingMiddlewares/errorHandler');

// http://localhost:5000/comments?postId=19
comments.get("/",(req, res)=>{
    let Id = req.query.postId;
    let sql = `SELECT c.userId AS userId,CONCAT(r.firstName,' ',r.lastName) AS userName, p.profImgUrl ,
    c.commentId, c.commentContent, c.parentCommentId FROM comments c JOIN registeredUser r ON (c.userId=r.userId)AND(c.postId=${Id})
    JOIN profileImg p ON r.userId=p.userId ORDER BY commentId`;
    RunGetQuery(sql,res);
})


// http://localhost:5000/comments?postId=19&userId=1&commentContent=acahcjv&parentCommentId=1
comments.post("/",[isRegUser,isNullcomment],(req, res)=>{
    let postId = req.query.postId;
    let userId = req.query.userId;
    let commentContent = req.query.commentContent;
    let parentCommentId = req.query.parentCommentId;
    if(commentContent !== undefined){
        let sql = (parentCommentId) ? `INSERT INTO comments(userId,postId,parentCommentId,commentContent) VALUES (${userId},${postId},${parentCommentId},'${commentContent}')` : `INSERT INTO comments(userId,postId,commentContent) VALUES (${userId},${postId},'${commentContent}')`;
        RunChangeQuery(sql);
        res.status(200).send("commented posted.");
    } else {
        res.status(302).send("Provide the comment's Content");
    }
})

// http://localhost:5000/comments?commentId=420&commentContent=acahcjv
comments.put("/",isNullcomment,(req, res)=>{
    let cId = req.query.commentId;
    let commentContent = req.query.commentContent;
    let sql = `UPDATE comments SET commentContent='${commentContent.trim()}' WHERE commentId=${cId}`;
    RunChangeQuery(sql);
    res.status(200).send("Edited successfully.");
})


// http://localhost:5000/comments?commentId=1
comments.delete("/",(req, res)=>{
    let cId = req.query.commentId;
    let sql = `DELETE FROM comments WHERE commentId=${cId}`;
    RunChangeQuery(sql);
    res.status(200).send("The comment deleted successfully.");
})
comments.use(errorHandler);
module.exports = comments;