const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const jwt = require('jsonwebtoken');

const { to, throwError} = require('../services/util.service');
const CONFIG = require('../config/config');

const employerSchema = new mongoose.Schema({
    name: {type: String, required: true},
    phone: {type: String, unique: true, sparse: true},
    userAccount: {type: mongoose.Schema.objectId, ref: 'User'},
    profile: {

    }
});

employerSchema.pre('remove', async function(next) {
    // Take off the jobs of the employer in the Jobs model.
});

employerSchema.methods.toWeb = function(){
    let json = this.toJSON();
    json.id = this._id;//this is for the front end
    return json;
};

employerSchema.virtual('jobs', {
    ref: 'Job',
    localField: '_id',
    foreignField:  'employer',
    justOne: false
});

const Employer = module.exports = mongoose.model('Employer', employerSchema);