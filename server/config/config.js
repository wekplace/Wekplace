require('dotenv').config();//instatiate environment variables


let CONFIG = {} //Make this global to use all over the application

CONFIG.app          = process.env.APP   || 'dev';
CONFIG.port         = process.env.PORT  || '3000';

CONFIG.db_host      = process.env.DB_HOST       || 'localhost';
CONFIG.db_port      = process.env.DB_PORT       || '27017';
CONFIG.db_name      = process.env.DB_NAME       || 'WEKPLACE-DB';
CONFIG.db_user      = process.env.DB_USER       || 'root';
CONFIG.db_password  = process.env.DB_PASSWORD   || 'password123';

CONFIG.jwt_expiration     = process.env.JWT_EXPIRATION      || '2h';
CONFIG.jwt_key            = process.env.JWT_KEY             || 'SECRET';
CONFIG.SEEKER_ACCOUNT     = process.env.AUTH_TYPE_SEEKER    || 'seeker';
CONFIG.EMPLOYER_ACCOUNT   = process.env.AUTH_TYPE_EMPLOYER  || 'employer';
CONFIG.ADMIN_ACCOUNT      = process.env.AUTH_TYPE_EMPLOYER  || 'admin';

module.exports = CONFIG;
