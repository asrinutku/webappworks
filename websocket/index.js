var express = require('express');
var socket = require('socket.io');
var app = express();

var server = app.listen(3000,function(){
    console.log("3000 listening");
});

var io = socket(server);

io.on('connection',(socket)=>{
    console.log("socket connection succesful and socket id :",socket.id);

    socket.on('chat',function(data){
        console.log(data);
        io.sockets.emit('chatview',data);
    });

    socket.on('texting',function(data){
        socket.broadcast.emit('textingback',data);
    });
})

app.use(express.static('public'));