const mongoose = require('mongoose');
const validate = require('mongoose-validator');

const employerSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true, sparse: true,
        validate: [validate({
            validator: 'isEmail',
            message: 'Invalid email'
        })]
    },
    phone: {type: String, unique: true, sparse:true},
    password: {type: String, required: true, 
        validate: [validate({
            validator: 'isLength',
            arguments: [6, Math.max()],
            message: 'Password should be 6 or more characters'
        })]
    }
});

module.exports = mongoose.model('Employer', employerSchema);