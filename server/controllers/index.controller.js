const { Job } = require('../models');
const {
    createJob,
    getMultiple,
    getSingle,
    updateSingle,
    deleteSingle
} = require('../services/helper.controller');

module.exports.createJob = async (req, res, next) => {
    let info = req.body, employerId = req.query.employerId; 
    createJob(req, res, info, employerId);
}

module.exports.getJobs = async (req, res, next) => {
    getMultiple(req, res, Job);
}

module.exports.getJob = async (req, res, next) => {
    getSingle(req, res, Job);
}

module.exports.updateJob = async (req, res, next) => {
    let updateOperations = req.body;
    updateSingle(req, res, Job, null, updateOperations);
}

module.exports.deleteJob = async (req, res, next) => {
    deleteSingle(req, res, Job);
}

module.exports.pushToJob = async (req, res, next) => {
    let pushOperations = req.body;
    pushToArr(req, res, Job, null, pushOperations);
}

module.exports.pullFromJob = async (req, res, next) => {
    let pullOperations = req.body;
    pullFromArr(req, res, Job, null, pullOperations);
}