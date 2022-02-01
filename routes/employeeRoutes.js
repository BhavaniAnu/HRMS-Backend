const express = require('express');
const employeeController = require('../models/employeeModel.js');

const router = express.Router();

 router.post('/employee', employeeController.create);
 router.get('/employee/:employeeId', [
    employeeController.getById
]);
router.patch('/employee/:employeeId', [
    employeeController.patchById
]);
router.delete('/employee/:employeeId', [
    employeeController.removeById
]);
module.exports = router;