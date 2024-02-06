const express = require('express');

const blogPostErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 403;
    const message = err.message || "UnAuthorized";
    (err.message==="The category is not present in the database, kindly select one from the options.");
    
};
module.exports = blogPostErrorHandler;