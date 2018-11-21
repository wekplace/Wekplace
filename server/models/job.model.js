const mongoose = require('mongoose');
const uniqueArrayPlugin = require('mongoose-unique-array');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: 'Please enter the job title' },
    email: { type: String, required: 'Please enter your email', unique: true, sparse: true },
    employer: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer' },
    seekers: [{ seeker: { type: mongoose.Schema.Types.ObjectId, ref: 'Seeker' } }],
    type: { type: String },
    remuneration: {
        remunerationType: String,
        currency: String,
        minVal: Number,
        maxVal: Number
    },
    location: { type: String },
    description: { type: String },
    requirements: [{type: String, default: []}],
    benefits: [{type: String, default: []}],
}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});
jobSchema.plugin(uniqueArrayPlugin);

jobSchema.methods.toWeb = function(){
    let json = this.toJSON();
    json.id = this._id;//this is for the front end
    return json;
};

const Job = module.exports = mongoose.model('Job', jobSchema);