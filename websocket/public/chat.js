var socket = io.connect('http://localhost:3000');

var message=document.querySelector('#message'),
    person=document.querySelector('#handle'),
    btn=document.querySelector('#send'),
    output = document.querySelector('#output'),
    feedback = document.querySelector('#feedback');


btn.addEventListener('click',function(){
    socket.emit('chat',{
        message:message.value,
        person:person.value
    });

    message.value='';
});

message.addEventListener('click',function(){
    socket.emit('texting',person.value);
})

socket.on('chatview',function(data){
  
    output.innerHTML += '<p><strong>'+data.person+': </strong>'+data.message+'</p>';
    feedback.innerHTML = '';
})

socket.on('textingback',function(data){

    feedback.innerHTML += '<p><em> '+data+' texting.. </em></p>';
})