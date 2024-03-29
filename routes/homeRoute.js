const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.route('/').get(homeController.homeController);

module.exports = router;
