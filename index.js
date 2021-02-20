const { response } = require('express');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);




app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    console.log('a user is connected');
    socket.on('disconnect', () => {
        console.log('a user is disconnected')
    })
})


io.on('connection', (socket) => {
    socket.broadcast.emit('hi');
});

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});




http.listen(8888, '0.0.0.0', function () {
    console.log('8888');
})