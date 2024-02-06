const express = require('express');
const updateCategories = express.Router();

const con = require('./../../DB_connection/connection');
const [RunChangeQuery, RunGetQuery] = require('./../../DB_connection/RunQuery');

const newAdminChecker = require('./../../Middlewares/newAdminChecker');

// http://localhost:5000/admin/updateCategories
updateCategories.get("/",(req, res)=>{
    let sql = `SELECT categoryId AS "Category Id", categoryTitle AS "Category Title", categoryDesc AS "Category Description" FROM category`;
    RunGetQuery(sql, res);
})
// Adding a category
// http://localhost:5000/admin/updateCategories?catTitle=abc&catDesc=cdf
updateCategories.post("/",(req, res)=>{
    let Title = req.query.catTitle;
    let Desc = req.query.catDesc;
    if(Title&&Desc){
        let sql = `INSERT INTO category(categoryTitle, categoryDesc) VALUES ('${Title}','${Desc}')`;
        RunChangeQuery(sql);
        res.send(`"${Title} is addded in the categories list."`).status(200);
    } else{
        res.send("Kindly provide the necessary details.").status(201);
    }

})

// http://localhost:5000/admin/updateCategories?catId=9&catTitle=UNiversity&catDesc=noWork
updateCategories.put("/",(req, res)=>{
    let Id = req.query.catId;
    let Title = req.query.catTitle;
    let Desc = req.query.catDesc;
    let i = (Id) ? true : false;
    let t = (Title) ? true : false;
    let d = (Desc) ? true : false;
    let sql = (i&&t&&d) ? `UPDATE category SET categoryTitle='${Title}', categoryDesc='${Desc}' WHERE categoryId=${Id}` : (i&&t) ? `UPDATE category SET categoryTitle='${Title}' WHERE categoryId=${Id}` : (i&&d) ? `UPDATE category SET categoryDesc='${Desc}' WHERE categoryId=${Id}` : undefined;
    (sql) ? RunChangeQuery(sql) : res.status(201).send("Provide the necessary Details for updating the category.");
    res.status(200).send(`The category with Id: ${Id} is successfully updated.`);
})

updateCategories.delete("/",(req, res)=>{
    let id = req.query.catId;
    let sql = `DELETE FROM category WHERE categoryId=${id}`;
    RunChangeQuery(sql);
    res.sendStatus(200).send(`The category with Id: ${id} is successfully deleted.`);
})

module.exports = updateCategories;