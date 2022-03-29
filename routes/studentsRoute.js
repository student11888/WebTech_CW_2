const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/studentsController');
router.route('/').get(studentsController.studentsController);

module.exports = router;
