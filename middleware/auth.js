const jwt = require('jsonwebtoken');


function authenticate(role) {
    return function(req, res, next) {
    try {
        //verifying JWT to get user data
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, 'secret_key');
        // console.log(user); checking isi user
        //check if user has required role
        if (!role.includes(user.role)) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        //passing user data to next middleware or route
        req.user = user;
        next();
        } catch (error) {
            return res.status(401).json({ error: 'Invalid token' });
        }
    };
}

module.exports = authenticate;