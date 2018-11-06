const mongoose = require('mongoose');
const uniqueArrayPlugin = require('mongoose-unique-array');

const profileSchema = new mongoose.Schema({
    aboutYourself: {type: String},
    webAddress: {type: Map, of: String},
    academicInstitution: {type: String},
    programStudied: [{type:String, unique: true, default: []}],
    levelOfEducation: {type: String},
    yearOfCompletion: {type: Date},
    otherAcademicQualifications: [{type: String, default: []}],
    careerGoals: [{type: String, default: []}],
    professionalStrengths: [{type: String, default: []}],
    professionalWeaknesses: [{type: String, default: []}],
    professionalAchievements: [{type: String, default: []}],
    preferredFieldOfWork: [{type: String, default: []}],
    uniqueQualities: [{type: String, default: []}],
    howYouHandleConflict: [{type: String, default: []}]
});
profileSchema.plugin(uniqueArrayPlugin);

const skillsSchema = new mongoose.Schema({
    web: [String],
    computerSoftware: [String],
    languages: [String],
    softSkills: [String]
});
skillsSchema.plugin(uniqueArrayPlugin);

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