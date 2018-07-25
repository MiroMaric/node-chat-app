const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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
    
    socket.on('disconnect',()=>{
        console.log('User was disconnected');
    });

    
    socket.on('createMessage',(message)=>{
        console.log('message: ',message);
    });

    socket.emit('newMessage',{
        from:'Miko',
        text:'Hello my friend!',
        createdAt:new Date().toString()
    });

    
});
server.listen(port,()=>{
    console.log(`Server is starten on port: ${port}`);
});