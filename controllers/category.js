const Category = require('../models/category');
const slugify = require('slugify');

// add new category to database
exports.create = (req, res) => {
    const category = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }

    const newCategory = Category(category);
    newCategory.save((error, cat) => {
        if (error) return res.status(400).json({ error });
        if (cat) {
            return res.status(201).json({ cat });
        }
    });
}

// fecth all categories from database
exports.getCategories = (req, res) => {
    Category.find({ })
    .exec((error, categories) => {
        if (error) return res.status(400).json({ error });
        if (categories) {
            return res.status(200).json({ categories });
        }
    });
}