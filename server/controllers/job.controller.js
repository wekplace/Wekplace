const { Job } = require('../models');
const {
    getMultiple,
    getSingle,
    updateSingle,
    deleteSingle,
    applyJob,
    createJob,
    pullFromArr,
    pushToArr
 } = require('../services/helper.controller');

module.exports.createJob = async (req, res, next) => {
    let employerId = req.params.employerId || null, info = req.body;
    createJob(req, res, info, employerId);
}

module.exports.applyJob = async (req, res, next) => {
    let jobId = req.body.jobId || null, seekerId = req.params.seekerId || null ;
    applyJob(req, res, seekerId);
}

module.exports.getJobs = async (req, res, next) => {
    getMultiple(req, res, Job);
};

module.exports.getJob = async (req, res, next) => {
    let filter = ({ jobId: req.params.jobId } || null);
    getSingle(req, res, Job, filter);
};

module.exports.updateJob = async (req, res, next) => {
    let filter = ({ jobId: req.params.jobId } || null), operations = req.body;
    updateSingle(req, res, Job, filter, operations);
};

module.exports.deleteJob = async (req, res, next) => {
    let filter = ({ jobId: req.params.jobId } || null);
    deleteSingle(req, res, Job, filter);
}

module.exports.pushToJob = async (req, res, next) => {
    let filter = ({ jobId: req.params.jobId } || null), pushOperations = req.body;
    pushToArr(req, res, Job, filter, pushOperations);
}

module.exports.pullFromJob = async (req, res, next) => {
    let filter = ({ jobId: req.params.jobId } || null), pullOperations = req.body;
    pullFromArr(req, res, Job, filter, pullOperations);
}