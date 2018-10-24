const { Seeker }      = require('../models');
const { resToErr, resToSuccess, to} = require('../services/util.service');

module.exports.signupSeeker = async (req, res, next) => {
    let phone = req.body.phone,
        email = req.body.email;
    Seeker.findOne({
        $or: [{ email }, { phone }]
    }).exec()
    .then(async (seeker) => {
        if (seeker) {
            if (seeker.email === email) {
                return resToErr(res, {message: 'Email exists'}, 400);
            }else if (seeker.phone === phone) {
                return resToErr(res, {message: 'Phone number exists'}, 400);
            }
        } else {
            let err, createdSeeker; // I am using this createdSeeker to prevent name conflict
            let seekerInfo = req.body;
            [err, createdSeeker] = await to(Seeker.create(seekerInfo));

            if(err) return resToErr(res, err, 500);

            return resToSuccess(res, {createdSeeker: createdSeeker.toWeb()}, 201);
        }
    })
}

module.exports.createSeeker = async (req, res, next) => {
    Seeker.findOne({email: req.body.email}).exec()
    .then(async (seeker) => {
        if (seeker) {
            return resToErr(res, {message: 'Email exists'}, 400);
        } else {
            let err, seeker;
            let seekerInfo = req.body;
            [err, seeker] = await to(Seeker.create(seekerInfo));

            if(err) return resToErr(res, err, 500);

            return resToSuccess(res, {seeker: seeker.toWeb()}, 201);
        }

    })
}

module.exports.getSeekers = async (req, res, next) => {
    let err, seekers;
    [err, seekers] = await to(Seeker.find().exec());

    if (err) return resToErr(res, err, 500);

    if (seekers.length > 0) {
        let resData = seekers.map((seeker) => {
            return seeker.toWeb();
        });
    
        return resToSuccess(res, {seekers: resData}, 200);
    }
};

module.exports.getSeekerById = async (req, res, next) => {
    let err, seeker, id = req.params.id;
    [err, seeker] = await to(Seeker.findOne({_id: id}).exec());

    if (err) return resToErr(res, err, 500);
    
    if (seeker) {
        let resData = seeker.toWeb();
        return resToSuccess(res, {seeker: resData}, 200);
    }
    return resToErr(res, {message: "Job seeker was not found"});
};

module.exports.updateSeeker = async (req, res, next) => {
    let updateOperations= {}, id=req.params.id, err, result;
    for (let operation of req.body) {
        if (operation.propName ===  "password") {
            err = {message: "Not allowed"};
            break; 
        }
        updateOperations[operation.propName] = operation.value;
    }
    
    [err, result] = await to(Seeker.updateOne({_id: id}, {$set: updateOperations}).exec());

    if (err) return resToErr(res, err, 500);
    
    let resData = { message: 'Seeker was updated' };
    return resToSuccess(res, resData, 200);

};

module.exports.deleteSeeker = async (req, res, next) => {
    Seeker.findOne({_id: req.params.id}).exec()
    .then(async (seeker) => {
        if (seeker) {
            let err, deletedSeeker;
            [err, deletedSeeker] = await to(seeker.remove());
            
            if (err) return resToErr(res, err, 500);

            let resData = { message: 'Seeker was deleted'};
            if (deletedSeeker) return resToSuccess(res, resData, 200);
        }

        return resToErr(res, {message: 'Seeker not found'}, 500);
    });
};

module.exports.loginSeeker = async (req, res, next) => {
    let err, seeker, email= req.body.email, password = req.body.password;
    [err, seeker] = await to(Seeker.findOne({email: email}).exec());
    
    if (err) return resToErr(res, err, 500);

    if (seeker) {
        let matchedSeeker;
        [err, matchedSeeker] = await to(seeker.comparePassword(password));
        
        if (err) return resToErr(res, err, 500);

        if (matchedSeeker) {
            const token = matchedSeeker.getJWT()
            let resData = {
                message: 'Authorization successful',
                token: token
            }
            return resToSuccess(res, resData, 200);
        }
    }
    
    return resToErr(res, {message: 'Authorization failed'}, 500);
}