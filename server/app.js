var express = require('express');
var path = require('path');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var game = require('./game');

game.init();

app.use(express.static(path.resolve(__dirname, '..', 'node_modules')));
app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.get('/', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

// game loop
function updateAllClients() {
    for (var socketId in io.sockets.sockets) {
        io.sockets.sockets[socketId].emit('update', game.playground);
    }
}

function onIteration() {
    var updatedPlayground = game.runRules();
    if (updatedPlayground) { updateAllClients(); }
    setTimeout(onIteration, 1000);
}
setTimeout(onIteration, 1000);

// socket actions
function onConnection(socket) {

    game.playerIn(socket.id);
    socket.emit('update', game.playground);
    console.log(socket.id + ': connect, color ' + game.players[socket.id]);

    socket.on('disconnect', () => {
        game.playerOut(socket.id);
    });

    socket.on('spawn', (data) => {
        game.spawnAt(data.y, data.x, socket.id);
        updateAllClients();
    });

    socket.on('pattern', (data) => {
        game.pattern(data.patternName, socket.id);
        updateAllClients();
    });
}

io.on('connection', onConnection);
server.listen(process.env.PORT || 9000);
