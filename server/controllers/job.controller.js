const { Job } = require('../models');
const { 
    getMultiple, 
    getSingle, 
    updateSingle, 
    deleteSingle,
    createUser} = require('../services/helper.controller');

module.exports.getAdmins = async (req, res, next) => {
    getMultiple(req, res, Admin);
};
