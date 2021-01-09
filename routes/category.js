const express = require('express');
const { create, getCategories } = require('../controllers/category');
const { requierSignIn, adminMiddleware } = require('../middlewares');
const router = express.Router();

router.post('/category/create', requierSignIn, adminMiddleware, create);
router.get('/category/getCategories', getCategories);

module.exports = router;