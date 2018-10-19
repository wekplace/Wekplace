const http = require('http');
const app = require('./app');
const CONFIG = require('./config/config');

const port = CONFIG.PORT;

const server = http.createServer(app);

server.listen(port);