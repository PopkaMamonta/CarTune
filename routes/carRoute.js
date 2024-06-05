const express = require('express');
const carController=require('../controllers/carController');
const router = express.Router()


router.get('/all',carController.getCars);


module.exports = router;