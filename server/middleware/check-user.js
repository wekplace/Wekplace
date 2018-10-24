const jwt = require('jsonwebtoken');
const {resToErr, to} = require('../services/util.service');
const CONFIG = require('../config/config');

module.exports = (req, res, next) => {
    if (req.params.id === req.user._id) {
        next();
    } else {
        resToErr(res, 'Access denied', 500);
    }
    
}

