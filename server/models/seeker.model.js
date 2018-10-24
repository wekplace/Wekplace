const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const jwt = require('jsonwebtoken');

const CONFIG = require('../config/config');

const { to, throwError} = require('../services/util.service');

const seekerSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    otherName: {type: String},
    email: {type: String, required: true, unique: true, sparse: true,
        validate: [validate({
            validator: 'isEmail',
            message: 'Invalid email'
        })]
    },
    phone: {type: String, unique: true, sparse:true,
        validate: [validate({
            validator: 'isMobilePhone',
            message: 'Invalid contact number'
        })]},
    password: {type: String, required: true, 
        validate: [validate({
            validator: 'isLength',
            arguments: [4, undefined],
            message: 'Password should be 6 or more characters'
        })]
    },
    permissions: [{type: String}],
    profile: {}
});

seekerSchema.pre('save', async function(next){
    if (this.isModified('password') || this.isNew) {
        
        let err, salt, hash;
        [err, salt] = await to(bcrypt.genSalt(10));
        if (err) throwError(err.message, true);

        [err, hash] = await to(bcrypt.hash(this.password, salt));
        if (err) throwError(err.message, true);

        this.password = hash;
    }
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

// Verify password
seekerSchema.methods.comparePassword = async function(pw){
    let err, match;
    if(!this.password) throwError('password not set');

    [err, match] = await to(bcrypt.compare(pw, this.password));
    if(err) throwError(err);

    if(!match) throwError('Authorization failed');

    return this;
}

seekerSchema.methods.toWeb = function(){
    let json = this.toJSON();
    json.id = this._id;//this is for the front end
    return json;
};

seekerSchema.methods.getJWT = function() {
    const token = jwt.sign({
        email: this.email,
        seekerId: this._id,
        permissions: this.permissions
    }, CONFIG.jwt_key_seeker, {
        expiresIn: CONFIG.jwt_expiration
    });
    return token;
}

// using populate on virtual
seekerSchema.virtual('job', {
    ref: 'Job', // the model to use
    localField: '_id', // where the localField which is the user's (auto generated) _id field
    foreignField: 'seekers.seeker', // is equal to users.user in the corresponding company document
    justOne: false,
});


const Seeker = module.exports = mongoose.model('Seeker', seekerSchema);