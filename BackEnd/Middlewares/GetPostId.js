const express = require('express');
const [RunChangeQuery, RunGetQuery, sendQueryResultsback] = require('./../DB_connection/RunQuery');

GetPostId = (req, res, next) => {
    let Ptitle = req.query.postTitle;
    sendQueryResultsback(`SELECT postId AS id FROM posts WHERE postTitle='${Ptitle}'`,(error,postId)=>{
        if(error){
            console.log(error);
            res.status(500).send("Internal Server Error.");
        } else{
            if(postId.length === 0){
                let error = new Error("The posts has been deleted or removed.");
                error.status = 302;
                next(error);
            } else {
                req.query.postId = postId[0].id;
                next();
            }
        }
    })
}
