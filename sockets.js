let readyPlayerCount = 0;

function listen(io) {
    let room;
    const pongNamespace = io.of('/pong');
    pongNamespace.on("connection", (socket) => {
        console.log('a user connected', socket.id);

        socket.on('ready', () => {
            room = 'room' + Math.floor(readyPlayerCount / 2);
            socket.join(room);

            console.log('Player ready', socket.id, room);

            readyPlayerCount++;

            if (readyPlayerCount % 2 === 0) {
                io.in(room).emit('startGame', socket.id);
            }
        });

        socket.on('paddleMove', (paddleData) => {
            socket.to(room).emit('paddleMove', paddleData);
        });

        socket.on('ballMove', (ballData) => {
            socket.to(room).emit('ballMove', ballData);
        });
    });
}

module.exports = {
    listen,
}