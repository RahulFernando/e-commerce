const express = require('express');
const { requierSignIn, adminMiddleware } = require("../middlewares");
const multer = require("multer");
const router = express.Router();
const shortid = require("shortid");
const path = require("path");
const { create, getAll, getProductBySlug } = require('../controllers/product');

// setup multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post('/product/create', requierSignIn, adminMiddleware, upload.array('productImgs'), create);
router.get('/product/getAll', getAll);
router.get('/product/:slug', getProductBySlug);

module.exports = router;