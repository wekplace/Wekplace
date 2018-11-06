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
    name: {type: String},
    position: {type: String},
    phone: {type: String,
        validate: [validate({
            validator: 'isNumeric',
            message: 'Invalid contact number'
        })]},
    email: {type: String, required: true, unique: true, sparse: true,
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