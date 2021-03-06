const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const jwt = require('jsonwebtoken');
const uniqueArrayPlugin = require('mongoose-unique-array');

const CONFIG = require('../config/config');
const Seeker = require('./seeker.model');
const Employer = require('./employer.model');
const Admin = require('./admin.model');

const { to, throwError } = require('../services/util.service');

const userSchema = new mongoose.Schema({
    email: {
        type: String, required: 'Please enter your email address', unique: true, sparse: true, lowercase: true,
        validate: [validate({
            validator: 'isEmail',
            message: 'Invalid email'
        })]
    },
    username: { type: String, unique: true, sparse: true },
    password: {
        type: String, required: 'Please enter your password',
        validate: [validate({
            validator: 'isLength',
            arguments: [5, undefined],
            message: 'Password should be 6 or more characters'
        })]
    },
    permissions: {
        type: [String]
    },
    referral: {type: String},
    account: { 
        category: { type: String, enum: ['seeker', 'employer', 'admin'], required: 'Please choose an account type' },
        __isAssigned__: { type: Boolean, default: false}
     }
}, {
    timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}
});
userSchema.plugin(uniqueArrayPlugin);

userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {

        let err, salt, hash;
        [err, salt] = await to(bcrypt.genSalt(10));
        if (err) throwError(err.message, true);

        [err, hash] = await to(bcrypt.hash(this.password, salt));
        if (err) throwError(err.message, true);
        this.password = hash;
    }

    
    if (this.account.category === 'seeker' & this.isNew) {
        this.permissions = ['seeker'];
    } else if (this.account.category === 'employer' & this.isNew ) {
        this.permissions = ['employer'];
    } else if (this.account.category === 'admin' & this.isNew) {
        this.permissions = ['admin'];
    }
});

userSchema.pre('remove', async function (next) {
    if (this.account.category === 'seeker' && this.account.__isAssigned__) {
        let [err, seeker] = await to(Seeker.findOne({ userAccount: this._id }).exec());
        if (err) throwError(err.message, true);
        seeker.remove();
    }
    if (this.account.category === 'employer' && this.account.__isAssigned__) {
        let [err, employer] = await to(Employer.findOne({ userAccount: this._id }).exec());
        if (err) throwError(err.message, true);
        employer.remove();
    }
    if (this.account.category === 'admin' && this.account.__isAssigned__) {
        let [err, admin] = await to(Admin.findOne({ userAccount: this._id }).exec());
        if (err) throwError(err.message, true);
        admin.remove();
    }
});

// Verify password
userSchema.methods.comparePassword = async function (pw) {
    let err, match;
    if (!this.password) throwError('password not set');

    [err, match] = await to(bcrypt.compare(pw, this.password));
    if (err) throwError(err);

    if (!match) throwError('Authorization failed');

    return this;
}

userSchema.methods.toWeb = function () {
    let json = this.toJSON();
    json.id = this._id;//this is for the front end
    return json;
};

userSchema.methods.getJWT = function (userData) {
    const token = jwt.sign({
        id: this._id,
        permissions: this.permissions
    }, CONFIG.jwt_key, {
            expiresIn: CONFIG.jwt_expiration
        });
    return token;
}

const User = module.exports = mongoose.model('User', userSchema);