const { resToErr, resToSuccess, to } = require('./util.service');
const { User, Seeker, Employer, Admin } = require('../models');
const CONFIG = require('../config/config');

module.exports.signupUser = async (req, res, userInfo) => {
    userInfo = userInfo || req.body;
    User.findOne({ 
        $or: [{email: userInfo.email}, {username: userInfo.username}]
    }).exec()
        .then(async (user) => {
            if (user) {
                if (user.email === userInfo.email) {
                    return resToErr(res, { message: 'Email exists' }, 400);
                }
                if (user.username === userInfo.username) {
                    return resToErr(res, { message: 'Username exists' }, 400);
                }
            }
            let err, createdUser; // I am using this createdUser to prevent name conflict
            [err, createdUser] = await to(User.create(userInfo));

            if (err) return resToErr(res, err, 500);

            let token = createdUser.getJWT();
            resData = {
                message: 'Authorization successful',
                token: token,
                expiresIn: CONFIG.jwt_expiration,
                user: createdUser
            }
            return resToSuccess(res, resData, 201);
        })
}

module.exports.loginUser = async (req, res, credential) => {
    let err, user;
    credential = credential || req.body;
    [err, user] = await to(User.findOne({ 
        $or: [{email: credential.userLogin}, {username: credential.userLogin}] })
        .exec());

    if (err) return resToErr(res, err, 500);

    if (user) {
        let matchedUser;
        [err, matchedUser] = await to(user.comparePassword(credential.password));

        if (err) return resToErr(res, err, 500);

        if (matchedUser) {
            let userData = {}, token, resData; // userData is the data from the corresponding user's account; either seeker, employer or admin

            if (matchedUser.account.category === CONFIG.SEEKER_ACCOUNT) {
                [err, userData] = await to(Seeker.findOne({userAccount: matchedUser._id}).exec());
            } else if (matchedUser.account.category === CONFIG.EMPLOYER_ACCOUNT) {
                [err, userData] = await to(Employer.findOne({userAccount: matchedUser._id}).exec());
            } else if (matchedUser.account.category === CONFIG.ADMIN_ACCOUNT) {
                [err, userData] = await to(Admin.findOne({userAccount: matchedUser._id}).exec());
            }
            if (userData) {
                token = matchedUser.getJWT();
                resData = {
                    message: 'Authorization successful',
                    token: token,
                    expiresIn: CONFIG.jwt_expiration,
                    user: user,
                    userData: userData
                }
            } else {
                token = matchedUser.getJWT();
                resData = {
                    message: 'Authorization incomplete',
                    token: token,
                    expiresIn: CONFIG.jwt_expiration,
                    user: user
                }
            }
            
            return resToSuccess(res, resData, 200);
        }
    }

    return resToErr(res, { message: 'Authorization failed' }, 500);
}