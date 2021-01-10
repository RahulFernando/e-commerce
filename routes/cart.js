const express = require('express');
const { addToCart } = require('../controllers/cart');
const { requierSignIn, userMiddleware,  } = require('../middlewares');
const router = express.Router();

router.post('/user/cart/add', requierSignIn, userMiddleware, addToCart);

module.exports = router;