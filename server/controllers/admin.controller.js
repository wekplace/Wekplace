const { Admin } = require('../models');
const { 
    getMultiple, 
    getSingle, 
    updateSingle, 
    deleteSingle,
    createUser} = require('../services/helper.controller');

module.exports.createAdmin = async (req, res, next) => {
    let info = req.body, userId = req.params.userId;
    createUser(req, res, Admin, info, userId);
}

module.exports.getAdmins = async (req, res, next) => {
    getMultiple(req, res, Admin);
};

module.exports.getAdmin = async (req, res, next) => {
    let filter = {_id: req.params.userId};
    getSingle(req, res, Admin, filter);
};

module.exports.updateAdmin = async (req, res, next) => {
    let operations = req.body, filter = {userAccount: req.params.userId};
    updateSingle(req, res, Admin, filter, operations);
};

module.exports.deleteAdmin = async (req, res, next) => {
    let filter = {userAccount: req.params.userId};
    deleteSingle(req, res, Admin, filter);
};
