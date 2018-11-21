const { getFilterFromQstr, resToErr, resToSuccess, to } = require('./util.service');
const { Employer, Job, Seeker, User } = require('../models');

module.exports.getMultiple = async (req, res, Model, filter, select, populateOptions) => {
    let  err, doc, queryParams = req.query;
    filter = (queryParams.filter ? getFilterFromQstr(queryParams.filter) : filter) || {};
    select = (queryParams.select ? queryParams.select : select) || "";
    populateOptions = populateOptions || "";
    [err, doc] = await to(Model.find(filter).select(select).populate(populateOptions).exec());

    if (err) return resToErr(res, err, 500);

    if (doc.length > 0 && typeof doc.toWeb == "function") {
        let resData = doc.map((user) => {
            return doc.toWeb();
        });

        return resToSuccess(res, { doc: resData }, 200);
    }
    return resToSuccess(res, doc, 200);
};

module.exports.getSingle = async (req, res, Model, filter, select, populateOptions) => {
    let err, doc, queryParams = req.query;
    filter = (queryParams.filter ? getFilterFromQstr(queryParams.filter) : filter) || {};
    select = (queryParams.select ? queryParams.select : select) || "";
    populateOptions = populateOptions || "";
    [err, doc] = await to(Model.findOne(filter).select(select).populate(populateOptions).exec());

    if (err) return resToErr(res, err, 500);

    if (doc) {
        return resToSuccess(res, { doc }, 200);
    }
    return resToErr(res, { message: `${Model.modelName} was not found` });
};

module.exports.updateSingle = async (req, res, Model, filter, operations) => {
    let updateOperations = {}, err, doc, queryParams=req.query;
    filter = (queryParams.filter ? getFilterFromQstr(queryParams.filter) : filter) || {};
    for (let operation of operations) {
        updateOperations[operation.propName] = operation.value;
    }

    [err, doc] = await to(Model.findOne(filter).exec());
    if (err) return resToErr(res, err, 500);

    doc.set(updateOperations);
    [err, savedDoc] = await to(doc.save());
    if (err) return resToErr(res, err, 500);

    let resData = { message: `${Model.modelName} was updated`, doc: savedDoc };
    return resToSuccess(res, resData, 200);
};

module.exports.pushToArr = async (req, res, Model, filter, operations) => {
    let err, doc, queryParams=req.query;
    
    filter = (queryParams.filter ? getFilterFromQstr(queryParams.filter) : filter) || {};
    [err, doc] = await to(Model.findOne(filter).exec());
    if (err) resToErr(res, err, 500);
    
    if (doc) {
        for (let operation of operations) {
            if (doc[operation.pathName]) doc[operation.pathName].push(operation.value);
            else return resToErr(res, {message: "Path does not exist", }, 500);
        }
    
        [err, savedDoc] = await to(doc.save());
        if (err) return resToErr(res, err, 500);
    
        let resData = { 
            message: `Push operations completed`, 
            _id: savedDoc._id
        }
        return resToSuccess(res, resData, 200);
    } else {
        return resToErr(res, {message: `${Model.modelName} does not exist`});
    }
}
module.exports.pullFromArr = async (req, res, Model, filter, operations) => {
    let err, doc, queryParams=req.query;
    
    filter = (queryParams.filter ? getFilterFromQstr(queryParams.filter) : filter) || {};
    [err, doc] = await to(Model.findOne(filter).exec());
    if (err) resToErr(res, err, 500);
    
    if (doc) {
        for (let operation of operations) {
            if (doc[operation.pathName]) doc[operation.pathName].pull(operation.value);
            else return resToErr(res, {message: "Path does not exist", }, 500);
        }
    
        [err, savedDoc] = await to(doc.save());
        if (err) return resToErr(res, err, 500);
    
        let resData = { 
            message: `Push operations completed`, 
            _id: savedDoc._id
        }
        return resToSuccess(res, resData, 200);
    } else {
        return resToErr(res, {message: `${Model.modelName} does not exist`});
    }
}

module.exports.deleteSingle = async (req, res, Model, filter) => {
    let queryParams=req.query, user, err;
    filter = (queryParams.filter ? getFilterFromQstr(queryParams.filter) : filter) || {};

    [err, user] = await to(Model.findOne(filter).exec());
    if(err) resToErr(res, err, 500);

    if (user) {        
        user.remove();
        resToSuccess(res, {message:`${Model.modelName} deleted`}, 200);
    } else {
        resToErr(res, {message: `${Model.modelName} not found`}, 400);
    }
};

module.exports.setChildSchema = async (req, res, Model, filter, info, childSchemaPath) => {
    let doc, queryParams=req.query;
    filter = (queryParams.filter ? getFilterFromQstr(queryParams.filter) : filter) || {};
    [err, doc] = await to(Model.findOne(filter).exec());
    if (err) resToErr(res, err, 500);

    if (doc) {
        doc[childSchemaPath] = info;
        let [err, savedDoc] = await to(doc.save());
        let resData = {
            model:{ name: Model.modelName, setPath: childSchemaPath},
            doc: doc._id,
            child: savedDoc[childSchemaPath],
            message: "Updated subschema"
        }
        return resToSuccess(res, resData, 200);
    } else {
        resToErr(res, {message: `${Model.modelName} not found`}, 400);
    }
}

module.exports.createUser = (req, res, Model, info, userId) => {
    userId = req.query.userId || userId || req.params.userId;
    let phone = info.phone;
    Model.findOne({ phone }).exec()
        .then(async (doc) => {
            if (doc) {
                if (doc.phone === phone) {
                    return resToErr(res, { message: 'Phone number exists' }, 400);
                }
            }
            let err, createdUser, user, accountCategory = Model.modelName.toLowerCase();
            [err, user] = await to(User.findOne({ $and: [{_id: userId}, {'account.category': accountCategory}] }).exec());
            if (!user) return resToErr(res, { message: 'User does not exist' }, 400);
            if (err) return resToErr(res, err, 500);

            if (user && !user.account.__isAssigned__) {
                user.account.__isAssigned__ = true;
                user.save();
                info.userAccount = info.userAccount || userId; // links users to their account
                [err, createdUser] = await to(Model.create(info));
                if (err) return resToErr(res, err, 500);

                return resToSuccess(res, { createdUser: createdUser.toWeb() }, 201);
            } else {
                return resToErr(res, {message: `User has already been assigned`}, 400);
            }
        })
        .catch(err => console.error(err));
}

module.exports.createJob = async (req, res, info, employerId) => {
    let employer, err, createdJob
    employerId = req.query.employerId || employerId;

    [err, employer] = await to(Employer.findOne({_id: employerId}).exec());
    if (!employer) return resToErr(res, { message: 'Employer does not exist' }, 400);
    if (err) return resToErr(res, err, 500);

    info.employer = info.employer || employerId;
    [err, createdJob] = await to(Job.create(info));
    if (err) return resToErr(res, err, 500);

    return resToSuccess(res, {createdJob: createdJob.toWeb()}, 201);
}

module.exports.applyJob = async (req, res, jobId, seekerId) => {
    let seeker, err, job, appliedJob;
    seekerId = req.query.seekerId || seekerId;
    jobId = req.query.jobId || jobId;

    [err, seeker] = await to(Seeker.findOne({_id: seekerId}).exec());
    if (!seeker) return resToErr(res, { message: 'Seeker does not exist' }, 400);
    if (err) return resToErr(res, err, 500);

    [err, job] = await to(Job.findOne({_id: jobId}).exec());
    job.seekers.push(seekerId);
    [err, appliedJob] = await to(job.save());
    if (err) resToErr(res, err, 500);

    let resData = {
        _id: appliedJob._id,
        title: appliedJob.title,
        location: appliedJob.location,
        description: appliedJob.description,
        requirements: appliedJob.requirements,
        benefits: appliedJob.benefits,
        seekerId: seekerId,
        message: 'Job applied'
    };
    resToSuccess(res, resData, 200);
}


// Theoretical features
// A get that works for all
// A set that works for all
// A post that works for all