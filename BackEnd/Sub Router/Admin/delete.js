const express = require('express');
const Delete = express.Router();
const bodyParser = require('body-parser');
const con = require('./../../DB_connection/connection');
const [RunChangeQuery, RunGetQuery, sendQueryResultsback] = require('./../../DB_connection/RunQuery');
// const errorHadnler = require('./../../Middlewares/ErrorHandlingMiddlewares/errorHandler');
// const newAdminChecker = require('./../../Middlewares/newAdminChecker');

// http://localhost:5000/admin/delete/1?_start=0&_end=8
Delete.get("/:id",(req, res)=> {
    let start = req.query._start;
    let end = req.query._end;
    
    let sql = `SELECT * FROM
    (SELECT r.userId, CONCAT(r.firstName,' ',r.lastName) AS userName, r.email, p.profImgURL AS profileImage 
    FROM registeredUser r JOIN profileImg p 
    ON r.userId=p.userId) AS authorData
    WHERE (authorData.userId IN (SELECT r.userId FROM registeredUser r JOIN roles a ON (r.roleId=a.roleId)AND(a.roleName='author')))
    LIMIT ${start},${end}`;
    sendQueryResultsback(sql,(err, authors)=>{
        if(err){
            res.send("Internal Server Error").status(500);
        }
        res.json({
            count: authors.length,
            userRecords: authors
        }).status(200);
    })

})

// http://localhost:5000/admin/delete/1/deletePost?_start=0&_end=8
Delete.get("/:id/:deletePosts",(req, res)=>{
    let start = req.query._start;
    let end = req.query._end;
    let id = req.params.id;
    sql = `SELECT p.postId, c.categoryTitle AS category, p.postTitle AS title, p.datePublished AS "Published Date" FROM posts p JOIN category c ON (p.categoryId=c.categoryId)AND(p.userId=${id}) LIMIT ${start},${end}`;
    sendQueryResultsback(sql, (error, posts)=>{
        if(error){
            console.log(error);
            res.send("Internal Server Error").status(500);
        } else{
            res.json({
                count: posts.length,
                postRecords: posts
            }).status(200);
        }
    })
})

// http://localhost:5000/admin/delete/userId/deletePost?postId=3&
Delete.delete("/:id/:deletePosts",(req, res)=>{
    let id = req.params.id;
    let userId = req.query.userId;
    let postId = req.query.postId;
    let sql = `DELETE FROM posts WHERE postId=${postId}`;
    RunChangeQuery(sql);
    res.send(`The post with Id : ${postId} is deleted successfully.`).status(200);
    

})

module.exports = Delete;
