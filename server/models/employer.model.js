const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const uniqueArrayPlugin = require('mongoose-unique-array');

const Job = require('./job.model');
const { profileSchema, contactPersonSchema } = require('./childSchemas/employer.schemas');

const { to, throwError } = require('../services/util.service');

const employerSchema = new mongoose.Schema({
    userAccount: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: 'Employer must have a user account'},
    name: {type: String, required: 'Please enter the business name'},
    phone: {type: String, unique: true,
        validate: [validate({
            validator: 'isNumeric',
            message: 'Invalid contact number'
        })]},
    tradingName: {type: String},
    location: {type: String},
    website: {type: String},
    orgEmail: {type: String, unique: true, sparse: true,
        validate: [validate({
            validator: 'isEmail',
            message: 'Invalid email'
        })]
    },
    yearEstablished: {type: Date},
    staffSize: {type: String},
    profile: profileSchema,
    contactPersons: [{type: contactPersonSchema, unique: true}]
}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});
employerSchema.plugin(uniqueArrayPlugin);

employerSchema.pre('remove', async function(next) {
    // Take off the jobs of the employer in the Jobs model.
});

employerSchema.methods.toWeb = function(){
    let json = this.toJSON();
    json.id = this._id;//this is for the front end
    return json;
};

employerSchema.methods.createJob = async function(jobInfo) {
    let err, createdJob;
    if (jobInfo.employer && jobInfo.employer === this._id) {
        [err, createdJob] = await to(Job.create(jobInfo));

        if(err) throwError('Job creation failed');
    } else {
        throwError('Job creation not authorized');
    }
    return createdJob;
}

employerSchema.virtual('jobs', {
    ref: 'Job',
    localField: '_id',
    foreignField:  'employer',
    justOne: false
});

const Employer = module.exports = mongoose.model('Employer', employerSchema);