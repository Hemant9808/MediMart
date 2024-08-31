const express = require('express');
const { login, signup } = require('../controllers/AuthController'); // Ensure these paths and names are correct

const router = express.Router();

router.post('/signup', signup); // Ensure 'signup' is defined
router.post('/login', login);   // Ensure 'login' is defined

module.exports = router;
