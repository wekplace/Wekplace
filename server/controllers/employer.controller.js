const { Employer } = require('../models');
const { 
    getMultiple, 
    getSingle, 
    updateSingle, 
    deleteSingle, 
    setChildSchema,
    createUser,
    pushToArr,
    pullFromArr,
    } = require('../services/helper.controller');


module.exports.createEmployer = async (req, res, next) => {
    let info = req.body, userId = req.params.userId;
    createUser(req, res, Employer, info, userId);
};

module.exports.getEmployers = async (req, res, next) => {
    getMultiple(req, res, Employer);
};

module.exports.getEmployer = async (req, res, next) => {
    let filter = ({ userAccount: req.params.userId } || null);
    getSingle(req, res, Employer, filter);
};

module.exports.updateEmployer = async (req, res, next) => {
    let updateOperations = req.body, filter = ({ userAccount: req.params.userId } || null);
    updateSingle(req, res, Employer, filter, updateOperations);
};

module.exports.deleteEmployer = async (req, res, next) => {
    let filter = ({ userAccount: req.params.userId } || null);
    deleteSingle(req, res, Employer, filter);
};

module.exports.setEmployerProfile = async (req, res, next) => {
    let filter = ({ userAccount: req.params.userId } || null), childSchemaPath = "profile", info = req.body;
    setChildSchema(req, res, Employer, filter, info, childSchemaPath);
}

module.exports.pushToEmployer = async (req, res, next) => {
    let filter = ({ userAccount: req.params.userId } || null), pushOperations = req.body;
    pushToArr(req, res, Employer, filter, pushOperations);
}

module.exports.pullFromEmployer = async (req, res, next) => {
    let filter = ({ userAccount: req.params.userId } || null), pullOperations = req.body;
    pullFromArr(req, res, Employer, filter, pullOperations);
}
