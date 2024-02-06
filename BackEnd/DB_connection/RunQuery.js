const mysql = require('mysql');
const con = require('./connection');
const express = require('express');


const RunChangeQuery = (runningQuery) => {
    con.query(runningQuery, (err) => {
        if(err) throw err;
        console.log("Successfully Continuing.");
    });
};

const RunGetQuery = (runningQuery, res) => {
    con.query(runningQuery, (err, results) => {
        if(err) throw err;
        res.send(results);
        
    });
    
}
const sendQueryResultsback = (runningQuery, callback) => {
    con.query(runningQuery,(err, results)=>{
        if(err){
            callback(err,null)
        } else{
            callback(undefined,results);
        }
        
    })
}
module.exports = [RunChangeQuery,RunGetQuery,sendQueryResultsback];