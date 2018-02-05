var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('cliente'));

// Rutas
//Importar Rutas
var appRoutes = require('../rutas/app');

//Definir Rutas
app.use("/", appRoutes);

var message = [{
    id: 1,
    text: 'Bienvenido al chat privado de Socket.io y Node js',
    nickname: 'Bot César Lachira'
}];

//Conexion socket
io.on("connection", function(socket) {
    console.log("a user connected: ");
    socket.emit('messages', message);
    socket.on('add-message', (data) => {
        message.push(data);
        io.sockets.emit('messages', message);
    });
});

server.listen(3000, () => {
    console.log('Servidor funcionando en el puerto 3000');
});