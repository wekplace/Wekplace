const { Job } = require('../models');
const {
    getMultiple,
    getSingle,
    updateSingle,
    deleteSingle,
    applyJob,
    createJob,
    pullFromArr,
    pushToArr,
    search
 } = require('../services/helper.controller');

module.exports.createJob = async (req, res, next) => {
    let info = req.body;
    createJob(req, res, info);
}

module.exports.applyJob = async (req, res, next) => {
    let jobId = req.body.jobId || null, seekerId = req.params.seekerId || null ;
    applyJob(req, res, seekerId);
}

module.exports.getJobs = async (req, res, next) => {
    getMultiple(req, res, Job);
};

module.exports.getJob = async (req, res, next) => {
    let filter = ({ _id: req.params.jobId } || null);
    getSingle(req, res, Job, filter, undefined, "employer name");
};

module.exports.getJobsSearch = async (req, res, next) => {
    let populateOptions = {
        path: 'employer',
        select: 'name'
    };
    let select = "title createdAt profileImageUrl";
    search(req, res, Job, select, populateOptions);
}

module.exports.updateJob = async (req, res, next) => {
    let filter = ({ _id: req.params.jobId } || null), operations = req.body;
    updateSingle(req, res, Job, filter, operations);
};

module.exports.deleteJob = async (req, res, next) => {
    let filter = ({ _id: req.params.jobId } || null);
    deleteSingle(req, res, Job, filter);
}

module.exports.pushToJob = async (req, res, next) => {
    let filter = ({ _id: req.params.jobId } || null), pushOperations = req.body;
    pushToArr(req, res, Job, filter, pushOperations);
}

module.exports.pullFromJob = async (req, res, next) => {
    let filter = ({ _id: req.params.jobId } || null), pullOperations = req.body;
    pullFromArr(req, res, Job, filter, pullOperations);
}