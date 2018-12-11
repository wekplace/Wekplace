const { Job } = require('../models');
const {
    getMultiple,
    getSingle,
    updateSingle,
    deleteSingle
} = require('../services/helper.controller');



module.exports.searchJobs = async (req, res, next) => {
    getMultiple(req, res, Job);
}
