const { Employer } = require('../models');
const { 
    getMultiple, 
    getSingle, 
    updateSingle, 
    deleteSingle, 
    setChildSchema,
    createUser} = require('../services/helper.controller');


module.exports.setEmployer = async (req, res, next) => {
    let info = req.body, userId = req.params.userId;
    createUser(req, res, Employer, info, userId);
};

module.exports.getEmployers = async (req, res, next) => {
    getMultiple(req, res, Employer);
};

module.exports.getEmployer = async (req, res, next) => {
    let filter = { userAccount: req.params.userId };
    getSingle(req, res, Employer, filter);
};

module.exports.updateEmployer = async (req, res, next) => {
    let updateOperations = req.body, filter = { userAccount: req.params.userId };
    updateSingle(req, res, Employer, filter, updateOperations);
};

module.exports.deleteEmployer = async (req, res, next) => {
    let filter = { userAccount: req.params.userId };
    deleteSingle(req, res, Employer, filter);
};

module.exports.setEmployerProfile = async (req, res, next) => {
    let filter = { userAccount: req.params.userId }, childSchemaPath = "profile", info = req.body;
    setChildSchema(req, res, Employer, filter, info, childSchemaPath);
}
