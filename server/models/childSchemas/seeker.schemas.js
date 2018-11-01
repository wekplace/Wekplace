const mongoose = require('mongoose');
const validate = require('mongoose-validator');

const profileSchema = new mongoose.Schema({
    aboutYourself: {type: String},
    webAddress: {type: Map, of: String},
    academicInstitution: {type: String},
    programStudied: [String],
    levelOfEducation: {type: String},
    yearOfCompletion: {type: String},
    otherAcademicQualifications: [String],
    careerGoals: [String],
    professionalStrengths: [String],
    professionalWeaknesses: [String],
    professionalAchievements: [String],
    preferredFieldOfWork: [String],
    uniqueQualities: [String],
    howYouHandleConflict: [String]
});

const skillsSchema = new mongoose.Schema({
    web: [String],
    computerSoftware: [String],
    languages: [String],
    softSkills: [String]
});

const expectationsSchema = new mongoose.Schema({
    max: {type: Number},
    min: {type: Number, required:true},
    remarks: {type: String}
});

module.exports = {
    profileSchema,
    skillsSchema,
    expectationsSchema
}