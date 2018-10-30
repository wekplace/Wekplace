// this model stores information about how a user heard about Wekplace
const mongoose = require('mongoose');
const validate = require('mongoose-validator');

const referralSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    detail: {type: String, required: true}
});

module.exports = mongoose.model('Referral', referralSchema);