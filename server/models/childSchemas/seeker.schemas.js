const mongoose = require('mongoose');
const uniqueArrayPlugin = require('mongoose-unique-array');

const profileSchema = new mongoose.Schema({
    aboutYourself: {type: String},
    webAddress: {type: Map, of: String},
    academicInstitution: {type: String},
    programStudied: [{type:String, default: [], unique: true}],
    levelOfEducation: {type: String},
    yearOfCompletion: {type: Date},
    otherAcademicQualifications: [{type: String, default: [], unique: true}],
    careerGoals: [{type: String, default: [], unique: true}],
    professionalStrengths: [{type: String, default: [], unique: true}],
    professionalWeaknesses: [{type: String, default: [], unique: true}],
    professionalAchievements: [{type: String, default: [], unique: true}],
    preferredFieldOfWork: [{type: String, default: [], unique: true}],
    uniqueQualities: [{type: String, default: [], unique: true}],
    howYouHandleConflict: [{type: String, default: [], unique: true}]
});
profileSchema.plugin(uniqueArrayPlugin);

const skillsSchema = new mongoose.Schema({
    web: [{type: String, unique: true}],
    computerSoftware: [{type: String, unique: true}],
    languages: [{type: String, unique: true}],
    softSkills: [{type: String, unique: true}]
});
skillsSchema.plugin(uniqueArrayPlugin);

const salaryExpectationsSchema = new mongoose.Schema({
    max: {type: Number},
    min: {type: Number, required:true},
    remarks: {type: String}
});

module.exports = {
    profileSchema,
    skillsSchema,
    salaryExpectationsSchema
}