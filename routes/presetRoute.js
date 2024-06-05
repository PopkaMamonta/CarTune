const express = require('express');
const presetController=require('../controllers/presetController');
const router = express.Router()


router.post('/preset',presetController.savePreset);


module.exports = router;