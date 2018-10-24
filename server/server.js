const http = require('http');
const app = require('./app');
const CONFIG = require('./config/config');

const port = CONFIG.port;

const server = http.createServer(app);
console.log(port);
server.listen(port);