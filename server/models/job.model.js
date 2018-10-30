const mongoose = require('mongoose');
const validate = require('mongoose-validator');

const jobSchema = new mongoose.Schema({
    title: {type: String, required: true},
    email: {type: String, required: true, unique: true, sparse: true},
    employer: {type: mongoose.Schema.ObjectId, ref: 'Employer'},
    seekers: [ { seeker: {type: mongoose.Schema.ObjectId, ref: 'Seeker'} } ]
});

module.exports = mongoose.model('Job', jobSchema);