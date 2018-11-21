const mongoose = require('mongoose');
const validate = require('mongoose-validator');

const { to } = require('../services/util.service');
const { profileSchema, skillsSchema, expectationsSchema} = require('./childSchemas/seeker.schemas');

const seekerSchema = new mongoose.Schema({
    firstName: {type: String, required: 'Please enter your first name'},
    lastName: {type: String, required: 'Please enter your last name'},
    otherName: {type: String},
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
    expectations: expectationsSchema
}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});

seekerSchema.pre('remove', async function(next) {
    // Find the jobs the seeker has applied to and take off the seeker's id from the seekers array
});

// Get all the jobs relating to a seeker
seekerSchema.methods.Jobs = async function(){
    let err, jobs;
    [err, jobs] = await to(Job.find({'seekers.seeker':this._id}));
    if(err) TE('err getting companies');
    return companies;
}

seekerSchema.methods.toWeb = function(){
    let json = this.toJSON();
    json.id = this._id;//this is for the front end
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