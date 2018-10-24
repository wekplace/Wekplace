const { Employer }      = require('../models');
const { resToErr, resToSuccess, to} = require('../services/util.service');

module.exports.signupEmployer = async (req, res, next) => {
    let phone = req.body.phone,
        email = req.body.email;
    Employer.findOne({
        $or: [{ email }, { phone }]
    }).exec()
    .then(async (employer) => {
        if (employer) {
            if (employer.email === email) {
                return resToErr(res, {message: 'Email exists'}, 400);
            }else if (employer.phone === phone) {
                return resToErr(res, {message: 'Phone number exists'}, 400);
            }
        } else {
            let err, createdEmployer; // I am using this createdEmployer to prevent name conflict
            let employerInfo = req.body;
            [err, createdEmployer] = await to(Employer.create(employerInfo));

            if(err) return resToErr(res, err, 500);

            return resToSuccess(res, {createdEmployer: createdEmployer.toWeb()}, 201);
        }
    })
}

module.exports.createEmployer = async (req, res, next) => {
    Employer.findOne({email: req.body.email}).exec()
    .then(async (employer) => {
        if (employer) {
            return resToErr(res, {message: 'Email exists'}, 400);
        } else {
            let err, employer;
            let employerInfo = req.body;
            [err, employer] = await to(Employer.create(employerInfo));

            if(err) return resToErr(res, err, 500);

            return resToSuccess(res, {seeker: seeker.toWeb()}, 201);
        }

    })
}

module.exports.getEmployers = async (req, res, next) => {
    let err, employers;
    [err, employers] = await to(Employer.find().exec());

    if (err) return resToErr(res, err, 500);

    if (employers.length > 0) {
        let resData = employers.map((seeker) => {
            return seeker.toWeb();
        });
    
        return resToSuccess(res, {employers: resData}, 200);
    }
};

module.exports.getEmployerById = async (req, res, next) => {
    let err, employer, id = req.params.id;
    [err, employer] = await to(Employer.findOne({_id: id}).exec());

    if (err) return resToErr(res, err, 500);
    
    if (employer){
        let resData = employer.toWeb();
        return resToSuccess(res, {seeker: resData}, 200);
    } 
    return resToErr(res, {message: "Employer was not found"});
};

module.exports.updateEmployer = async (req, res, next) => {
    let updateOperations= {}, id=req.params.id, err, result;
    for (let operation of req.body) {
        if (operation.propName ===  "password") {
            err = {message: "Not allowed"};
            break;
        }
        updateOperations[operation.propName] = operation.value;
    }
    
    [err, result] = await to(Employer.updateOne({_id: id}, {$set: updateOperations}).exec());

    if (err) return resToErr(res, err, 500);
    
    if (result) {
        let resData = { message: 'Employer was updated' };
        return resToSuccess(res, resData, 200);
    }
    return resToErr(res, {message: 'Update could not be completed'}, 500);
};

module.exports.deleteEmployer = async (req, res, next) => {
    Employer.findOne({_id: req.params.id}).exec()
    .then(async (employer) => {
        if (employer) {
            let err, deletedEmployer;
            [err, deletedEmployer] = await to(employer.remove());
            
            if (err) return resToErr(res, err, 500);

            let resData = { message: 'Employer was deleted'};
            if (deletedEmployer) return resToSuccess(res, resData, 200);
        }

        return resToErr(res, {message: 'Employer not found'}, 500);
    });
};

module.exports.loginEmployer = async (req, res, next) => {
    let err, employer, email= req.body.email, password = req.body.password;
    [err, employer] = await to(Employer.findOne({email: email}).exec());
    
    if (err) return resToErr(res, err, 500);

    if (employer) {
        let matchedEmployer;
        [err, matchedEmployer] = await to(employer.comparePassword(password));
        
        if (err) return resToErr(res, err, 500);

        if (matchedEmployer) {
            const token = matchedEmployer.getJWT()
            let resData = {
                message: 'Authorization successful',
                token: token
            }
            return resToSuccess(res, resData, 200);
        }
    }
    
    return resToErr(res, {message: 'Authorization failed'}, 500);
}