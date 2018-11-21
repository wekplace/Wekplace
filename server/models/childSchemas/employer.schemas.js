const mongoose = require('mongoose');
const validate = require('mongoose-validator');

const profileSchema = new mongoose.Schema({
    aboutCompany: {type: String},
    vision: {type: String},
    mission: {type: String},
    culture: {type: String},
    socialMedia: {type: Map, of: String},
});

const contactPersonSchema = new mongoose.Schema({
    firstName: {type: String, required: 'Please enter contact person firstname'},
    lastName: {type: String, required: 'Please enter contact person last name'},
    position: {type: String},
    phone: {type: String, required: 'Please enter the contact person phone number',
        validate: [validate({
            validator: 'isNumeric',
            message: 'Invalid contact number'
        })]},
    email: {type: String, required: 'Please enter the contact person email', unique: true, sparse: true,
        validate: [validate({
            validator: 'isEmail',
            message: 'Invalid email'
        })]
    }
});

module.exports = {
    profileSchema,
    contactPersonSchema
}