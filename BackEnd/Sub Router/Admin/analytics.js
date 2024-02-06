const express = require('express');
const analytics = express.Router();

const con = require('./../../DB_connection/connection');
const [RunChangeQuery, RunGetQuery, sendQueryResultsback] = require('./../../DB_connection/RunQuery');

const newAdminChecker = require('./../../Middlewares/newAdminChecker');

// http://localhost:5000/admin/analytics?_start=0&_end=8
analytics.get("/",(req, res)=>{
    let start = req.query._start;
    let end = req.query._end;
    let sql =`SELECT reg.userId AS id, CONCAT(reg.firstName,' ',reg.lastName) AS userName,
    analytics.totalViewCount AS viewCount, analytics.averageRating, analytics.totalPosts AS postCount FROM 
    (SELECT 
        p.userId,
        COUNT(p.postId) AS totalPosts,
        COALESCE(SUM(p.viewCount),0) AS totalViewCount,
        COALESCE(AVG(r.rating),0.00) AS averageRating 
    FROM
        posts p
    LEFT JOIN
        ratings r ON (p.postId = r.postId)
    GROUP BY p.userId) AS analytics JOIN registeredUser reg 
    ON analytics.userId = reg.userId
    ORDER BY reg.userId
    LIMIT ${start},${end};`;
    if(start&&end){
    sendQueryResultsback(sql, (error, analysis)=>{
        if(error){
            console.log(error);
            res.status(500).send("Internal server error.");
        } else{
            res.status(200).json({
                count: analysis.length,
                analysisRecords: analysis
            })
        }

        })
    } else{
        res.send("Kindly provide the start and end indexes.")
    }
})


module.exports = analytics;