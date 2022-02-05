const http = require('http');
const io = require('socket.io');

const api = require('./api');
const sockets = require('./sockets');

const PORT = 3000;

const httpServer = http.createServer(api);
const socketServer = new io.Server(httpServer);

httpServer.listen(PORT,  '',() => {
    console.log(`Listening on port ${PORT}...`);
});

sockets.listen(socketServer);