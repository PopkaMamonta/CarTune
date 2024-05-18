const express = require('express');
const userController=require('../controllers/userController')
const router = express.Router()

router.post('/', (req, res, next) => {
    console.log('Received request:', req.body);
    next();
}, userController.regUser);

router.post('/login', userController.loginUser);

module.exports = router;