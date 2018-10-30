const { User } = require('../models');
const { Seeker } = require('../models');
const { Employer } = require('../models');
const { resToErr, resToSuccess, to } = require('../services/util.service');
const CONFIG = require('../config/config');

module.exports.signupUser = async (req, res, next) => {
    let userInfo = req.body;
    User.findOne({ 
        $or: [{email: userInfo.email}, {username: userInfo.username}]
    }).exec()
        .then(async (user) => {
            if (user) {
                if (user.email === email) {
                    return resToErr(res, { message: 'Email exists' }, 400);
                }
                if (user.username === username) {
                    return resToErr(res, { message: 'Username exists' }, 400);
                }
            }
            let err, createdUser; // I am using this createdUser to prevent name conflict
            [err, createdUser] = await to(User.create(userInfo));

            if (err) return resToErr(res, err, 500);

            return resToSuccess(res, { createdUser: createdUser.toWeb() }, 201);
        })
}

module.exports.loginUser = async (req, res, next) => {
    let err, user, credential = req.body, token;
    [err, user] = await to(User.findOne({ 
        $or: [{email: credential.userLogin}, {username: credential.userLogin}] })
        .exec());

    if (err) return resToErr(res, err, 500);

    if (user) {
        let matchedUser;
        [err, matchedUser] = await to(user.comparePassword(credential.password));

        if (err) return resToErr(res, err, 500);

        if (matchedUser) {
            let userData; // userData is the data from the corresponding user's account; either seeker, employer or admin
            if (matchedUser.accountType === CONFIG.SEEKER_ACCOUNT) {
                [err, userData] = await to(Seeker.findOne({userAccount: matchedUser._id}).exec());
                token = matchedUser.getJWT(credential.userLogin, userData);
            } else if (matchedUser.accountType === CONFIG.EMPLOYER_ACCOUNT) {
                [err, userData] = await to(Employer.findOne({userAccount: matchedUser._id}).exec());
                token = matchedUser.getJWT(credential.userLogin, userData);
            } else if (matchedUser.accountType === CONFIG.ADMIN_ACCOUNT) {
                
            }
            
            let resData = {
                message: 'Authorization successful',
                token: token,
                id: userData._id
            }
            return resToSuccess(res, resData, 200);
        }
    }

    return resToErr(res, { message: 'Authorization failed' }, 500);
}

module.exports.getUsers = async (req, res, next) => {
    let err, users;
    [err, users] = await to(User.find().exec());

    if (err) return resToErr(res, err, 500);

    if (users.length > 0) {
        let resData = users.map((user) => {
            return user.toWeb();
        });

        return resToSuccess(res, { users: resData }, 200);
    }
};

module.exports.getUserById = async (req, res, next) => {
    let err, user, id = req.params.id;
    [err, user] = await to(User.findOne({ _id: id }).exec());

    if (err) return resToErr(res, err, 500);

    if (user) {
        let resData = user.toWeb();
        return resToSuccess(res, { user: resData }, 200);
    }
    return resToErr(res, { message: "User was not found" });
};

module.exports.updateUser = async (req, res, next) => {
    let updateOperations = {}, id = req.params.id, err, user;
    for (let operation of req.body) {
        updateOperations[operation.propName] = operation.value;
    }

    [err, user] = await to(User.findOne({ _id: id }).exec());
    if (err) return resToErr(res, err, 500);
    
    user.set(updateOperations);
    [err, savedUser] = await to(user.save());
    if (err) return resToErr(res, err, 500);

    let resData = { message: 'User was updated', user: savedUser };
    return resToSuccess(res, resData, 200);
};

module.exports.deleteUser = async (req, res, next) => {
    User.findOne({ _id: req.params.id }).exec()
        .then(async (user) => {
            if (user) {
                let err, deletedUser;
                [err, deletedUser] = await to(seeker.remove());

                if (err) return resToErr(res, err, 500);

                let resData = { message: 'Seeker was deleted' };
                if (deletedUser) return resToSuccess(res, resData, 200);
            }

            return resToErr(res, { message: 'User not found' }, 500);
        });
};
