const mongoose = require('mongoose');
const validate = require('mongoose-validator');

const jobSchema = mongoose.Schema({
    title: {type: String, required: true},
    email: {type: String, required: true, unique: true, sparse: true},
    employer: {type: mongoose.Schema.ObjectId, ref: 'Employer'},
    seekers: [ { users: {type: mongoose.Schema.ObjectId, ref: 'Seeker'} } ]
});

module.exports = mongoose.model('Job', jobSchema);