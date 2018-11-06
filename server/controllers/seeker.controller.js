const { Seeker } = require('../models');
const { 
    getMultiple, 
    getSingle, 
    updateSingle, 
    deleteSingle, 
    setChildSchema,
    createUser} = require('../services/helper.controller');

module.exports.createSeeker = async (req, res, next) => {
    let userId = req.params.userId, info = req.body;
    createUser(req, res, Seeker, info, userId);
}

module.exports.getSeekers = async (req, res, next) => {
    getMultiple(req, res, Seeker);
};

module.exports.getSeeker = async (req, res, next) => {
    let filter = {userAccount: req.params.userId};
    getSingle(req, res, Seeker, filter);
};

module.exports.updateSeekerUserId = async (req, res, next) => {
    let filter = {userAccount: req.params.userId}, updateOperations = req.body;
    updateSingle(req, res, Seeker, filter, updateOperations);
};

module.exports.deleteSeekerUserId = async (req, res, next) => {
    let filter = { userAccount: req.params.userId };
    deleteSingle(req, res, Seeker, filter);
};

module.exports.setSeekerProfile = async (req, res, next) => {
    let filter = { userAccount: req.params.userId }, childSchemaPath = "profile", info = req.body;
    setChildSchema(req, res, Seeker, filter, info, childSchemaPath);
}

module.exports.setSeekerSkills = async (req, res, next) => {
    let filter = { userAccount: req.params.userId }, childSchemaPath = "skills", info = req.body;
    setChildSchema(req, res, Seeker, filter, info, childSchemaPath);
}

module.exports.createSeekerExpections = async (req, res, next) => {
    let filter = { userAccount: req.params.userId }, childSchemaPath = "expectations", info = req.body;
    setChildSchema(req, res, Seeker, filter, info, childSchemaPath);
}
