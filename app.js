var server = require('http').Server();
var io = require('socket.io')(server);
var Redis = require('ioredis');
var redis = new Redis();

redis.subscribe('levi-notifications', function(err, count) {
});

redis.on('message', function(channel, message) {
    console.log('Message Recieved: ' + message);
		// console.log('Channel: ' + channel);
    message = JSON.parse(message);
		console.log(channel + ':' + message.event);
    io.emit(channel + ':' + message.event, message.data);
});

server.listen(3000, function(){
    console.log('Listening on Port 3000');
});