const { resToErr, resToSuccess, to } = require('./util.service');
const { User, Seeker, Employer, Admin } = require('../models');

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

            return resToSuccess(res, { createdUser: createdUser.toWeb() }, 201);
        })
}

module.exports.loginUser = async (req, res, credential) => {
    let err, user, credential = credential || req.body, token;
    [err, user] = await to(User.findOne({ 
        $or: [{email: credential.userLogin}, {username: credential.userLogin}] })
        .exec());

    if (err) return resToErr(res, err, 500);

    if (user) {
        let matchedUser;
        [err, matchedUser] = await to(user.comparePassword(credential.password));

        if (err) return resToErr(res, err, 500);

        if (matchedUser) {
            let userData, id="none"; // userData is the data from the corresponding user's account; either seeker, employer or admin
                                     // id is the id of the corresponding user; either id of the seeker, employer or admin
            if (matchedUser.account.category === CONFIG.SEEKER_ACCOUNT) {
                [err, userData] = await to(Seeker.findOne({userAccount: matchedUser._id}).exec());
            } else if (matchedUser.account.category === CONFIG.EMPLOYER_ACCOUNT) {
                [err, userData] = await to(Employer.findOne({userAccount: matchedUser._id}).exec());
            } else if (matchedUser.account.category === CONFIG.ADMIN_ACCOUNT) {
                [err, userData] = await to(Admin.findOne({userAccount: matchedUser._id}).exec());
            }
            if (userData) {
                token = matchedUser.getJWT(credential.userLogin, userData);
                id = userData._id
            } else {
                token = matchedUser.getJWT(credential.userLogin);
            }
            
            let resData = {
                message: 'Authorization successful',
                token: token,
                id: id,
                userId: user._id
            }
            return resToSuccess(res, resData, 200);
        }
    }

    return resToErr(res, { message: 'Authorization failed' }, 500);
}