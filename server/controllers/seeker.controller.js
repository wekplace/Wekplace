const { Seeker } = require('../models');
const {
    getMultiple,
    getSingle,
    updateSingle,
    deleteSingle,
    setChildSchema,
    createUser,
    applyJob } = require('../services/helper.controller');

module.exports.createSeeker = async (req, res, next) => {
    let userId = req.params.userId, info = req.body;
    createUser(req, res, Seeker, info, userId);
}

module.exports.getSeekers = async (req, res, next) => {
    getMultiple(req, res, Seeker);
};

module.exports.getSeeker = async (req, res, next) => {
    let filter = ({ userAccount: req.params.userId } || null);
    getSingle(req, res, Seeker, filter);
};

module.exports.updateSeeker = async (req, res, next) => {
    let filter = ({ userAccount: req.params.userId } || null), updateOperations = req.body;
    updateSingle(req, res, Seeker, filter, updateOperations);
};

module.exports.deleteSeeker = async (req, res, next) => {
    let filter = ({ userAccount: req.params.userId } || null);
    deleteSingle(req, res, Seeker, filter);
};

module.exports.setSeekerProfile = async (req, res, next) => {
    let filter = ({ userAccount: req.params.userId } || null), childSchemaPath = "profile", info = req.body;
    setChildSchema(req, res, Seeker, filter, info, childSchemaPath);
}

module.exports.setSeekerSkills = async (req, res, next) => {
    let filter = ({ userAccount: req.params.userId } || null), childSchemaPath = "skills", info = req.body;
    setChildSchema(req, res, Seeker, filter, info, childSchemaPath);
}

module.exports.setSeekerExpections = async (req, res, next) => {
    let filter = ({ userAccount: req.params.userId } || null), childSchemaPath = "expectations", info = req.body;
    setChildSchema(req, res, Seeker, filter, info, childSchemaPath);
}

module.exports.applyJob = async (req, res, next) => {
    applyJob(req, res);
}

module.exports.pushToSeeker = async (req, res, next) => {
    let filter = ({ userAccount: req.params.userId } || null), pushOperations = req.body;
    pushToArr(req, res, Seeker, filter, pushOperations);
}

module.exports.pullFromSeeker = async (req, res, next) => {
    let filter = ({ userAccount: req.params.userId } || null), pullOperations = req.body;
    pullFromArr(req, res, Seeker, filter, pullOperations);
}