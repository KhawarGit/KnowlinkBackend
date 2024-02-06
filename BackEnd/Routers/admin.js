const express = require('express');
const admin = express.Router();
// const [RunChangeQuery, RunGetQuery] = require('./../DB_connection/RunQuery');
const errorHandler = require('./../Middlewares/ErrorHandlingMiddlewares/errorHandler');
// Sub Routers of Admin.
const updateCategories = require('./../Sub Router/Admin/updateCategories');
const Delete = require('./../Sub Router/Admin/delete');
const analytics = require('./../Sub Router/Admin/analytics');

// MIddlewares for Admin
// const newAdminChecker = require('./../Middlewares/newAdminChecker');

admin.use('/delete',Delete);
admin.use('/updateCategories',updateCategories);
admin.use('/analytics',analytics);


admin.use(errorHandler);
module.exports = admin;