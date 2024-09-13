const express = require('express');
const { login, signup, forgotPassword } = require('../controllers/AuthController'); 

const router = express.Router();

router.post('/signup', signup); 
router.post('/login', login);   
router.post('/forgotPassword', forgotPassword); 
module.exports = router;
