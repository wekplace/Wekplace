const fs               = require('fs');
const path             = require('path');
const basename         = path.basename(__filename);
const models           = {};
const mongoose         = require('mongoose');
const CONFIG = require('../config/config');

if(CONFIG.db_host != ''){
    let files = fs
      .readdirSync(__dirname)
      .filter((file) => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
      // There must be a '.' character in the filename
      // And the file must not be the current file which is index.js
      // The file must end with a '.js'
    })
      .forEach((file) => {
        var filename = file.split('.')[0]; // Gets the filename without the extensions
        var model_name = filename.charAt(0).toUpperCase() + filename.slice(1); // Capitalizes the filename
        models[model_name] = require('./'+file); // requires the file into its appropriate name. eg) model.J = require('job.model.js')
    });

    const mongo_location = 'mongodb://'+CONFIG.db_host+':'+CONFIG.db_port+'/'+CONFIG.db_name;
    const dbConnectionOptions = {useNewUrlParser: true};

    mongoose.connect(mongo_location, dbConnectionOptions).catch((err)=>{
        console.log('Can Not Connect to Mongo Server:', mongo_location)
    })

    let db = mongoose.connection;
    module.exports = db;
    db.once('open', ()=>{
        console.log('Connected to mongo at '+mongo_location);
    })
    db.on('error', (error)=>{
        console.log("error", error);
    })
    // End of Mongoose Setup
}else{
    console.log("No Mongo Credentials Given");
}

module.exports = models;
