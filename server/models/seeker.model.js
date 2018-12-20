const mongoose = require('mongoose');
const validate = require('mongoose-validator');

const Job = require('./job.model');
const { to, throwError } = require('../services/util.service');
const { profileSchema, skillsSchema, salaryExpectationsSchema} = require('./childSchemas/seeker.schemas');

const seekerSchema = new mongoose.Schema({
    firstName: {type: String, required: 'Please enter your first name'},
    lastName: {type: String, required: 'Please enter your last name'},
    otherName: {type: String},
    profileImageUrl: {type: String},
    gender: {type: String},
    residentialAddress: {type: String},
    phone: {type: String, unique: true,
        validate: [validate({
            validator: 'isNumeric',
            message: 'Invalid contact number'
        })]},
    preferredJobType: {type: String},
    userAccount: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: 'Seeker must have a user account'},
    profile: profileSchema,
    skills: skillsSchema,
    expectations: salaryExpectationsSchema
}, {
    timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}
});

seekerSchema.pre('remove', async function(next) {
    // Find the jobs the seeker has applied to and take off the seeker's id from the seekers array
});

// Get all the jobs relating to a seeker
seekerSchema.methods.getJobs = async function(){
    let err, jobs;
    [err, jobs] = await to(Job.find({seekers: this._id}));
    if(err) TE('err getting jobs');
    return jobs;
}

// Apply for a job
seekerSchema.methods.applyJob = async function(jobId) {
    let job, err;
    
    [err, job] = await to(Job.findOne({seekers: this._id}).exec()); // check if seeker has already applied for the job
    if(job) return { job: job, message: "Job already applied"};
    if (err) throwError(err);

    [err, job] = await to(Job.findOne({_id: jobId}).exec());
    if (err) throwError(err);

    if (job) {
        let appliedJob;
        job.seekers.push(this._id);
        [err, appliedJob] = await to(job.save());
        if (err) throwError(err["message"]);

        return appliedJob;
    }

    throwError("Job not found");
}

seekerSchema.methods.toWeb = function(){
    let json = this.toJSON();
    return json;
};

// using populate on virtual
seekerSchema.virtual('jobs', {
    ref: 'Job', // the model to use
    localField: '_id', // where the localField which is the user's (auto generated) _id field
    foreignField: 'seekers.seeker', // is equal to users.user in the corresponding company document
    justOne: false,
});

const Seeker = module.exports = mongoose.model('Seeker', seekerSchema);