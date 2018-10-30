const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const jwt = require('jsonwebtoken');

const CONFIG = require('../config/config');

const { to, throwError} = require('../services/util.service');

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true, sparse: true,
        validate: [validate({
            validator: 'isEmail',
            message: 'Invalid email'
        })]
    },
    username: {type: String, unique: true, sparse:true},
    password: {type: String, required: true, 
        validate: [validate({
            validator: 'isLength',
            arguments: [4, undefined],
            message: 'Password should be 6 or more characters'
        })]
    },
    permissions: {
        type: [String],
        default: ['registered'] 
    },
    accountType: {type: String, required: true}
});

userSchema.pre('save', async function(next){
    if (this.isModified('password') || this.isNew) {
        
        let err, salt, hash;
        [err, salt] = await to(bcrypt.genSalt(10));
        if (err) throwError(err.message, true);

        [err, hash] = await to(bcrypt.hash(this.password, salt));
        if (err) throwError(err.message, true);

        this.password = hash;
    }
});

userSchema.pre('remove', async function(next) {
    // Find the corresponding job seeker or employer and eradicate his data in every table.
});

// Verify password
userSchema.methods.comparePassword = async function(pw){
    let err, match;
    if(!this.password) throwError('password not set');

    [err, match] = await to(bcrypt.compare(pw, this.password));
    if(err) throwError(err);

    if(!match) throwError('Authorization failed');

    return this;
}

userSchema.methods.toWeb = function(){
    let json = this.toJSON();
    json.id = this._id;//this is for the front end
    return json;
};

userSchema.methods.getJWT = function(userLogin, userData) { 
    // userLogin could be either email or username
    const token = jwt.sign({
        userLogin: userLogin,
        id: this._id,
        permissions: userData.permissions
    }, CONFIG.jwt_key, {
        expiresIn: CONFIG.jwt_expiration
    });
    return token;
}

const User = module.exports = mongoose.model('User', userSchema);