const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message');

var publicPath = path.join(__dirname,'../public');
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

app.get('/',(req,res)=>{
    res.send('/index.html');
});

io.on('connection',(socket)=>{
    console.log('New user connected');
    
    socket.emit('newMessage',generateMessage('admin','Welcome the awewsome chat App in the world'));

    socket.broadcast.emit('newMessage',generateMessage('admin','New user joined to chat'));

    socket.on('disconnect',()=>{
        io.emit('newMessage',generateMessage('admin','User left chat'));
    });

    socket.on('createMessage',(message,callback)=>{
        console.log('message: ',message);
        io.emit('newMessage',generateMessage(message.from,message.text));
        callback();
    });

    socket.on('createLocationMessage',(location)=>{
        io.emit('newLocationMessage',generateLocationMessage('admin',location.latitude,location.longitude));
    });
});

server.listen(port,()=>{
    console.log(`Server is starten on port: ${port}`);
});