const slugify = require('slugify');
const Product = require('../models/product');

exports.create = (req, res) => {
    const {
        name, 
        price,
        description,
        category,
    } = req.body;

    let productImgs = [];

    if (req.files.length > 0) {
        productImgs = req.files.map(file => {
            return { img: file.filename }
        });
    }

    const product = new Product({
       name: name,
       slug: slugify(name),
       price,
       description,
       productImgs,
       category,
       createdBy: req.user._id
    });

    product.save((error, product) => {
        if (error) return res.status(400).json({ error });
        if (product) return res.status(201).json({ product });
    });
}