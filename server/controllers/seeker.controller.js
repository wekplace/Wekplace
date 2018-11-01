const { Seeker, User } = require('../models');
const { resToErr, resToSuccess, to } = require('../services/util.service');

module.exports.createSeeker = async (req, res, next) => {
    let phone = req.body.phone;
    Seeker.findOne({ phone }).exec()
        .then(async (seeker) => {
            if (seeker) {
                if (seeker.phone === phone) {
                    return resToErr(res, { message: 'Phone number exists' }, 400);
                }
            }
            let err, createdSeeker, user, userId = req.params.userId;
            [err, user] = await to(User.findOne({_id: userId}));
            if (!user) return resToErr(res, {message: 'User does not exist'}, 400);
            if (err) return resToErr(res, err, 500);

            let seekerInfo = req.body;
            seekerInfo.userAccount = userId || ''; // links users to their account
            [err, createdSeeker] = await to(Seeker.create(seekerInfo));

            if (err) return resToErr(res, err, 500);

            return resToSuccess(res, { createdSeeker: createdSeeker.toWeb() }, 201);
        });
}

module.exports.getSeekers = async (req, res, next) => {
    let err, seekers;
    [err, seekers] = await to(Seeker.find().exec());

    if (err) return resToErr(res, err, 500);

    if (seekers.length > 0) {
        let resData = seekers.map((seeker) => {
            return seeker.toWeb();
        });

        return resToSuccess(res, { seekers: resData }, 200);
    }
};

module.exports.getSeekerByUserId = async (req, res, next) => {
    let err, seeker, userId = req.params.userId;
    [err, seeker] = await to(Seeker.findOne({ userAccount: userId }).exec());

    if (err) return resToErr(res, err, 500);

    if (seeker) {
        let resData = seeker.toWeb();
        return resToSuccess(res, { seeker: resData }, 200);
    }
    return resToErr(res, { message: "Job seeker was not found" });
};

module.exports.updateSeekerUserId = async (req, res, next) => {
    let updateOperations = {}, id = req.params.id, err, result;
    for (let operation of req.body) {
        if (operation.propName === "password") {
            err = { message: "Not allowed" };
            break;
        }
        updateOperations[operation.propName] = operation.value;
    }

    [err, result] = await to(Seeker.updateOne({ _id: id }, { $set: updateOperations }).exec());

    if (err) return resToErr(res, err, 500);

    let resData = { message: 'Seeker was updated' };
    return resToSuccess(res, resData, 200);

};

module.exports.deleteSeekerUserId = async (req, res, next) => {
    Seeker.findOne({ _id: req.params.userId }).exec()
        .then(async (seeker) => {
            if (seeker) {
                let err, deletedSeeker;
                [err, deletedSeeker] = await to(seeker.remove());

                if (err) return resToErr(res, err, 500);

                let resData = { message: 'Seeker was deleted' };
                if (deletedSeeker) return resToSuccess(res, resData, 200);
            }

            return resToErr(res, { message: 'Seeker not found' }, 500);
        })
        .catch(err => console.error(err));
};

module.exports.createSeekerProfileByUserId = async (req, res, next) => {
    let userId = req.params.userId, profileInfo = req.body;
    Seeker.findOne({userAccount: userId}).exex()
        .then(async (seeker) => {
            seeker.profile.set(profileInfo);
            let [err, savedSeeker] = await to(seeker.save());
            if (err) resToErr(res, err, 500);

            let resData = {
                userId: userId,
                seeker: savedSeeker._id,
                profile: savedSeeker.profile
            }

            return resToSuccess(res, resData, 201);
        })
        .catch(err => console.error(err));
}

module.exports.getSeekerProfileByUserId = async (req, res, next) => {
    let userId = req.params.userId;
    Seeker.findOne({userAccount: userId}).select('profile').exex()
        .then(async (seeker) => {
            seeker.profile.set(profileInfo);
            let [err, savedSeeker] = await to(seeker.save());
            if (err) resToErr(res, err, 500);

            let resData = {
                userId: userId,
                seeker: savedSeeker._id,
                profile: savedSeeker.profile
            }

            return resToSuccess(res, resData, 201);
        })
        .catch(err => console.error(err));
}

module.exports.createSeekerSkillsByUserId = async (req, res, next) => {
    let userId = req.params.userId, skillsInfo = req.body;
    Seeker.findOne({userAccount: userId}).exex()
        .then(async (seeker) => {
            seeker.skills.set(skillsInfo);
            let [err, savedSeeker] = await to(seeker.save());
            if (err) resToErr(res, err, 500);

            let resData = {
                userId: userId,
                seeker: savedSeeker._id,
                skills: savedSeeker.skills
            }

            return resToSuccess(res, resData, 201);
        })
        .catch(err => console.error(err));
}

module.exports.getSeekerSkillsByUserId = async (req, res, next) => {
    let userId = req.params.userId;
    Seeker.findOne({userAccount: userId}).select('skills').exex()
        .then(async (seeker) => {
            seeker.profile.set(profileInfo);
            let [err, savedSeeker] = await to(seeker.save());
            if (err) resToErr(res, err, 500);

            let resData = {
                userId: userId,
                seeker: savedSeeker._id,
                profile: savedSeeker.profile
            }

            return resToSuccess(res, resData, 201);
        })
        .catch(err => console.error(err));
}

module.exports.createSeekerExpectionsByUserId = async (req, res, next) => {
    let userId = req.params.userId, expectationsInfo = req.body;
    Seeker.findOne({userAccount: userId}).exex()
        .then(async (seeker) => {
            seeker.skills.set(expectationsInfo);
            let [err, savedSeeker] = await to(seeker.save());
            if (err) resToErr(res, err, 500);

            let resData = {
                userId: userId,
                seeker: savedSeeker._id,
                expectations: savedSeeker.expectations
            }

            return resToSuccess(res, resData, 201);
        })
        .catch(err => console.error(err));
}

module.exports.getSeekerExpectationsByUserId = async (req, res, next) => {
    let userId = req.params.userId;
    Seeker.findOne({userAccount: userId}).select('expectations').exex()
        .then(async (seeker) => {
            seeker.profile.set(profileInfo);
            let [err, savedSeeker] = await to(seeker.save());
            if (err) resToErr(res, err, 500);

            let resData = {
                userId: userId,
                seeker: savedSeeker._id,
                profile: savedSeeker.profile
            };

            return resToSuccess(res, resData, 201);
        })
        .catch(err => console.error(err));
}