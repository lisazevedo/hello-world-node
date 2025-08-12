const express = require('express');
const router = express.Router();
const helloController = require('../controllers/helloController');

// Define a route for the root URL ("/") and connect it to the controller function
router.get('/', helloController.getHelloWorld);

module.exports = router;

