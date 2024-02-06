const express = require('express');
const mysql= require('mysql');
const Post = express.Router();
const con= require('./../../DB_connection/connection');
const [RunChangeQuery, RunGetQuery, sendQueryResultsback] = require('./../../DB_connection/RunQuery');
const bodyParser = require('body-parser');
Post.use(bodyParser.json());

Post.use(express.json());
const categoryChecker = require('../../Middlewares/categoryChecker');
const authorChecker = require('./../../Middlewares/authorChecker');
const isUniqueTitle = require('./../../Middlewares/isTitleUnique');
const ErrorHandler = require('../../Middlewares/ErrorHandlingMiddlewares/errorHandler');

// Post.use(authorChecker);
// Post.use(categoryChecker);
// Post.use(isUniqueTitle);


http://localhost:5000/homepage/Post
Post.post("/",authorChecker,categoryChecker,isUniqueTitle,(req, res)=>{
    console.log(" wapis aagya post mien")
    
    let desc = req.body.desc;
    let userid = req.body.authId;
    let catId = req.body.catId;
    let content = req.body.content;
    let title = req.body.title;

    let sql = (title&&content) ? (desc) ? `INSERT INTO posts(userId,categoryId,postTitle,postContent,postDesc) VALUES (${userid},${catId},'${title}','${content}','${desc}')` :  `INSERT INTO posts(userId,categoryId,postTitle,postContent) VALUES (${userid},${catId},'${title}','${content}')` : undefined;
    
    (sql) ? RunChangeQuery(sql) : res.status(302).send("Posts should be given title and content."); 
    res.status(200).send(`The blog "${title}" has been posted successfully.`);
})

Post.post("/postCover",(req, res)=>{
    let postId = req.body.postId;
    let CoverImgSrc = req.body.imgSrc;
    let sql = `INSERT INTO postCoverImg(postId,postCoverImgUrl) VALUES (${postId},'${CoverImgSrc}')`;
    RunChangeQuery(sql);
    res.status(200).send("POst Cover Image is added.");
})

Post.use(ErrorHandler);
module.exports = Post;


