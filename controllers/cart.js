const Cart = require('../models/cart');
const slugify = require('slugify');

// add new item to cart collection
exports.addToCart = (req, res) => {

    Cart.findOne({ user: req.user._id })
    .exec((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
            // cart already exists then update the cart
            const product = req.body.cartItems.product;
            const item = cart.cartItems.find(c => c.product == product);

            if (item) {
                Cart.findOneAndUpdate({ "user": req.user._id, "cartItems.product": product },{
                    "$set": {
                        "cartItems.$": {
                            ...req.body.cartItems,
                            quantity: item.quantity + req.body.cartItems.quantity
                        }
                    }
                })
                .exec((error, _cart) => {
                    if (error) return res.status(400).json({ error });
                    if (_cart) return res.status(201).json({ message: 'Item added to cart!' });
                });
            }else {
                Cart.findOneAndUpdate({ user: req.user._id },{
                    "$push": {
                        "cartItems": req.body.cartItems
                    }
                })
                .exec((error, _cart) => {
                    if (error) return res.status(400).json({ error });
                    if (_cart) return res.status(201).json({ message: 'Item added to cart!' });
                });
            }


        }else {
            // cart not exists then create cart
            const cart = new Cart({
                user: req.user._id,
                cartItems: [req.body.cartItems]
            });
        
            cart.save((error, cart) => {
                if (error) return res.status(400).json({ error });
                if (cart) return res.status(201).json({ message: 'Item added to cart!' });
            })
        }
    })

    
}