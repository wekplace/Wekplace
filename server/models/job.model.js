const mongoose = require('mongoose');
const uniqueArrayPlugin = require('mongoose-unique-array');
const validate = require('mongoose-validator');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: 'Please enter the job title' },
    email: { type: String, required: 'Please enter your email',
        validate: [validate({
            validator: 'isEmail',
            message: 'Invalid email'
        })]},
    employer: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer', required: true },
    seekers: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Seeker'} ],
    type: { type: String, index: true },
    remuneration: {
        remunerationType: String,
        currency: String,
        minVal: Number,
        maxVal: Number
    },
    coverImageUrl: {type: String},
    location: { type: String },
    description: { type: String },
    aboutPosition: { type: String },
    responsibilities: {type: [String], default:[], unique: true},
    skillRequirements: [{type: String, default: [], unique: true}],
    qualifications: [{type: String, default: [], unique: true}],
    benefits: [{type: String, default: [], unique:true}],
    tags:  [{type: String, default: [], unique:true}],
}, {
    timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}
});
jobSchema.plugin(uniqueArrayPlugin);

jobSchema.methods.toWeb = function(){
    let json = this.toJSON();
    json.id = this._id;//this is for the front end
    return json;
};

const Job = module.exports = mongoose.model('Job', jobSchema);