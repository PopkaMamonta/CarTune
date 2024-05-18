const express = require('express');
const userController=require('../controllers/userController')
const router = express.Router()
const verifyJWT = require('../middleware/verifyJWT');

router.post('/', (req, res, next) => {
    console.log('Received request:', req.body);
    next();
}, userController.regUser);

router.post('/login', userController.loginUser);

router.get('/user/current', verifyJWT, userController.currentUser);

module.exports = router;