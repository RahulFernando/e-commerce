const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const shortid = require('shortid')

// add new user to database if user is not registered
exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
    .exec(async (error, user) => {
        if (user) {
            return res.status(400).json({
                message: 'Admin already registered'
            });
        }

        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;

        // hashing password
        const hash_password = await bcrypt.hash(password, 10);

        const _user = new User({
            firstName,
            lastName,
            email,
            hash_password,
            userName: shortid.generate(),
            role: 'admin'
        });

        _user.save((error, data) => {
            if(error){
                return res.status(400).json({
                    message: 'Something went wrong'
                });
            }
            if (data) {
                return res.status(201).json({
                    message: 'Admin created successfully'
                })
            }
        })
    });
}

// sign in user with json web token
exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
    .exec((error, user) => {
        if (error) return res.status(400).json({ error })

        if (user) {
            if (user.authenticate(req.body.password) && user.role === 'admin') {
                const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRETE, { expiresIn: '1d' });
                const {
                    _id,
                    firstName,
                    lastName,
                    email,
                    role,
                    fullName
                } = user;
                res.cookie('token', token, { expiresIn: '1d' });
                res.status(200).json({
                    token,
                    user: {
                        _id,
                        firstName,
                        lastName,
                        email,
                        role,
                        fullName
                    }
                });
            }else {
                return res.status(400).json({
                    message: 'Invalid password'
                })
            }
        }else {
            res.status(400).json({ message: 'Something went wrong' })
        }
    })
}

// signout admin from system 
exports.signout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Signout successfully...' });
}
