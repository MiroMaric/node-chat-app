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
    
    socket.emit('newMessage',{
        from:'admin',
        text:'Welcome the awewsome chat App in the world',
        createdAt:new Date().toString().split(' ')[0]
    });

    socket.broadcast.emit('newMessage',{
        from:'admin',
        text:'New user joined to chat',
        createdAt:new Date().toString().split(' ')[0]
    });

    socket.on('disconnect',()=>{
        console.log('User was disconnected');
    });

    socket.on('createMessage',(message)=>{
        console.log('message: ',message);
        io.emit('newMessage',{
            from:message.from,
            text:message.text,
            createdAt:new Date().getDate()
        });
        // socket.broadcast.emit('newMessage',{
        //     from:message.from,
        //      text:message.text,
        //      createdAt:new Date().toTimeString()
        // });
    });

    
});
server.listen(port,()=>{
    console.log(`Server is starten on port: ${port}`);
});