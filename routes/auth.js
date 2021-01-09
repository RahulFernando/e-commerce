const express = require('express');
const { signup, signin } = require('../controllers/auth');
const router = express.Router();
const { isRequestValidated, validateSignupRequest, validateSigninRequest } = require('../validators/auth');

router.post('/signin', validateSigninRequest, isRequestValidated, signin);

router.post('/signup', validateSignupRequest, isRequestValidated, signup);

module.exports = router;