const jwt = require('jsonwebtoken');
const {resToErr, to} = require('../services/util.service');
const CONFIG = require('../config/config');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if(!token) resToErr(res, {message: 'No token provided'}, 403);

        let verified = jwt.verify(token, CONFIG.jwt_key);
        req.user = verified;
        next();
    } catch (error) {
        return resToErr(res, {message: 'Authentication failed'}, 401);
    }
}