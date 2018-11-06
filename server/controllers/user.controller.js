const { User } = require('../models');
const { getMultiple, getSingle, updateSingle, deleteSingle } = require('../services/helper.controller');
const { loginUser, signupUser } = require('../services/helper.auth');

module.exports.signupUser = async (req, res, next) => {
    let userInfo = req.body;
    signupUser(req, res, userInfo);
}

module.exports.loginUser = async (req, res, next) => {
    let credential = req.body;
    loginUser(req, res, credential);
}

module.exports.getUsers = async (req, res, next) => {
    getMultiple(req, res, User);
};

module.exports.getUser = async (req, res, next) => {
    let filter = ({_id: req.params.userId} || null);
    getSingle(req, res, User, filter);
};

module.exports.updateUser = async (req, res, next) => {
    let filter = ({_id: req.params.userId} || null), operations = req.body;
    updateSingle(req, res, User, filter, operations);
};

module.exports.deleteUser = async (req, res, next) => {
    let filter = ({_id: req.params.userId} || null);
    deleteSingle(req, res, User, filter);
};
