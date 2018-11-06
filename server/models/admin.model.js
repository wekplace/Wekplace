const mongoose = require('mongoose');
const validate = require('mongoose-validator');

const adminSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    otherName: { type: String },
    userAccount: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    phone: {type: String,
        validate: [validate({
            validator: 'isNumeric',
            message: 'Invalid contact number'
        })]}
});

adminSchema.pre('remove', async function(next) {
    // Take off the jobs of the employer in the Jobs model.
});

adminSchema.methods.toWeb = function(){
    let json = this.toJSON();
    json.id = this._id;//this is for the front end
    return json;
};

module.exports = mongoose.model('Admin', adminSchema);