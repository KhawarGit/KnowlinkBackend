const express = require('express');

const ErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 403;
    const message = err.message || "UnAuthorized";
    res.status(statusCode).send(message);
};
module.exports = ErrorHandler;