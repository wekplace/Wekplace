const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const jwt = require('jsonwebtoken');

const { to, throwError} = require('../services/util.service');
const CONFIG = require('../config/config');

const employerSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true, sparse: true,
        validate: [validate({
            validator: 'isEmail',
            message: 'Invalid email'
        })]
    },
    phone: {type: String, unique: true, sparse: true},
    password: {type: String, required: true, 
        validate: [validate({
            validator: 'isLength',
            arguments: [4, undefined],
            message: 'Password should be 4 or more characters'
        })]
    },
    permissions: [{type: String}]
});

employerSchema.pre('save', async function(next){
    if (this.isModified('password') || this.isNew) {

        let err, salt, hash;
        [err, salt] = await to(bcrypt.genSalt(10));
        if (err) throwError(err.message, true);

        [err, hash] = await to(bcrypt.hash(this.password, salt));
        if (err) throwError(err.message, true);

        this.password = hash;
    }
});

employerSchema.pre('remove', async function(next) {
    // Take off the jobs of the employer in the Jobs model.
});

// Verify password
employerSchema.methods.comparePassword = async function(pw){
    let err, match;
    if(!this.password) throwError('password not set');

    [err, match] = await to(bcrypt.compare(pw, this.password));
    if(err) throwError(err);

    if(!match) throwError('Authorization failed');

    return this;
};

employerSchema.methods.toWeb = function(){
    let json = this.toJSON();
    json.id = this._id;//this is for the front end
    return json;
};

employerSchema.methods.getJWT = function() {
    const token = jwt.sign({
        email: this.email,
        employerId: this._id
    }, CONFIG.jwt_key_employer, {
        expiresIn: CONFIG.jwt_expiration
    });
    return token;
};

employerSchema.virtual('jobs', {
    ref: 'Job',
    localField: '_id',
    foreignField:  'employer',
    justOne: false
});

const Employer = module.exports = mongoose.model('Employer', employerSchema);