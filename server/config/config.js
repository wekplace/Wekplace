require('dotenv').config();//instatiate environment variables


let CONFIG = {} //Make this global to use all over the application

CONFIG.app          = process.env.APP   || 'dev';
CONFIG.port         = process.env.PORT  || '3000';

CONFIG.db_host      = process.env.DB_HOST       || 'localhost';
CONFIG.db_port      = process.env.DB_PORT       || '27017';
CONFIG.db_name      = process.env.DB_NAME       || 'WEKPLACE-DB';
CONFIG.db_user      = process.env.DB_USER       || 'root';
CONFIG.db_password  = process.env.DB_PASSWORD   || 'password123';

CONFIG.jwt_expiration     = process.env.JWT_EXPIRATION      || '10000';
CONFIG.jwt_key_seeker     = process.env.JWT_KEY_SEEKER      || 'SEEKER';
CONFIG.jwt_key_employer   = process.env.JWT_KEY_EMPLOYER    || 'EMPLOYER'; 
CONFIG.auth_type_seeker   = process.env.AUTH_TYPE_SEEKER    || 'seeker';
CONFIG.auth_type_employer = process.env.AUTH_TYPE_EMPLOYER  || 'employer'

module.exports = CONFIG;
