const jwt = require('jsonwebtoken');

// check user is valid or not using jwt
exports.requierSignIn = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRETE);
        req.user = user;
    }else {
        return res.status(400).json({ message: 'Authorization required'});
    }
    next();   
}

// verify only user can read categories
exports.userMiddleware = (req, res, next) => {
    if (req.user.role !== "user") {
        return res.status(400).json({ message: 'Acces denied' });
    }
    next(); 
}

// verify only admin can create categories
exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(400).json({ message: 'Acces denied' });
    }
    next();
}