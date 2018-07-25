var socket = io();
socket.on('connect',function(){
    console.log('Connected to server');
});

socket.on('disconnect',function(){
    console.log('Disconnected from server');
});

socket.on('newMessage',function(message){
    setTimeout(()=>{
        document.getElementById('from').innerHTML = message.from;
        document.getElementById('text').innerHTML = message.createdAt+': '+message.text;
    },1000);

    socket.emit('createMessage',{
        from:'Miko',
        text:'Cao picke, stigo Zdravko Colic'
    });
});

