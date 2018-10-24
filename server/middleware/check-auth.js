const jwt = require('jsonwebtoken');
const {resToErr, to} = require('../services/util.service');
const CONFIG = require('../config/config');

module.exports = (authType) => {
    const authMiddleware = (req, res, next) => {
        try {
            const token = req.headers.authorization.split(" ")[1];
            let verified;
            if (authType === CONFIG.auth_type_seeker) {
                verified = jwt.verify(token, CONFIG.jwt_key_seeker);
            } else if (authType === CONFIG.auth_type_employer) {
                verified = jwt.verify(token, CONFIG.jwt_key_employer);
            } else {
                return resToErr(res, {message: 'Authentication failed ok'}, 500);
            }
            req.user = verified;
            next();
        } catch (error) {
            return resToErr(res, {message: 'Authentication failed'}, 500);
        }
        
    }
    return authMiddleware;
}

