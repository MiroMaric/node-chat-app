var socket = io();

socket.on('connect',function(){
    console.log('Connected to server');
});

socket.on('disconnect',function(){
    console.log('Disconnected from server');
});

socket.on('newMessage',function(message){
    console.log(message);
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}:${message.text}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage',function(message){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">: MY LOCATION</a>');
    var formattedTime = moment(message.createdAt).format('h:mm a');
    li.text(`${message.from} ${formattedTime}`);
    a.attr('href',message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
    var messageBox = jQuery('[name=message]');
    socket.emit('createMessage',{
        from:'User',
        text:messageBox.val()
    },function(){
        messageBox.val('');
    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('Your browser not support geolocation');
    }
    locationButton.attr('disabled','disabled').text('Sending...');
    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
        locationButton.removeAttr('disabled').text('Send location');
    },function(){
        alter('Unable to fetch location');
        locationButton.removeAttr('disabled').text('Send location');
    });
});