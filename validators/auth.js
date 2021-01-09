const { check, validationResult } = require('express-validator');

// validate signup
exports.validateSignupRequest = [
    check('firstName')
    .notEmpty()
    .withMessage('First name is required'),
    check('lastName')
    .notEmpty()
    .withMessage('Last name is required'),
    check('email')
    .isEmail()
    .withMessage('Valid email required'),
    check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 character long')
]

// validate signin
exports.validateSigninRequest = [
    check('email')
    .isEmail()
    .withMessage('Valid email required'),
    check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 character long')
]

// check errors exist or not
exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    next();
}