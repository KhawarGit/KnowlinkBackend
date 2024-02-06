const express = require('express');

isNullcomment = (req, res, next) => {
    let content = req.query.commentContent;
    if(content.trim() === ""){
        console.log("if check hrha history.");
        let error = new Error("The comment has no content.");
        error.status = 400;
        next(error);
    } else{
        next();
    }

}

module.exports = isNullcomment;