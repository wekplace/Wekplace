const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const morgan = require('morgan');
const pe = require('parse-error');

const {resToErr, resToSuccess} = require('./services/util.service');

const adminRoutes = require('./routes/admin.route')
const employerRoutes = require('./routes/employer.route');
const jobRoutes = require('./routes/job.route');
const seekerRoutes = require('./routes/seeker.route');
const usersRoutes = require('./routes/users.route');
const indexRoutes = require('./routes/index.route');

// DATABASE
const models = require("./models");

// morgan middleware: handles logging
app.use(morgan('dev'));

// middleware to handle public folder
app.use('/upload', express.static('upload'))

// bodyParser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// handling CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return resToSuccess(res, {}, 200);
    }
    next();
});

// router middleware
app.use('/', indexRoutes);
app.use('/admins', adminRoutes);
app.use('/employers', employerRoutes);
app.use('/jobs', jobRoutes);
app.use('/seekers', seekerRoutes);
app.use('/users', usersRoutes);

// handling errors - any route operation that makes it pass the above routes is definitely an error.

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    resToErr(res, error, error.status || 500);
});

module.exports = app;

process.on('unhandledRejection', error => {
    console.error('Uncaught Error', pe(error));
})
.on('uncaughtException', err => {
  console.error(err, 'Uncaught Exception thrown');
  process.exit(1);
});