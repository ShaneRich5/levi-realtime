var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readdirSync('/etc/nginx/ssl/api.levihq.com/226909/server.key'),
  cert: fs.readdirSync('/etc/nginx/ssl/api.levihq.com/226909/server.crt')
};

var server = https.createServer(options);

// var server = require('http').Server();
var io = require('socket.io')(server);
var Redis = require('ioredis');
var redis = new Redis();


redis.subscribe('levi-notifications', function(err, count) {});

redis.on('message', function(channel, message) {
    console.log('Message Recieved: ' + message);
		// console.log('Channel: ' + channel);
    message = JSON.parse(message);
		console.log(channel + ':' + message.event);
    io.emit(channel + ':' + message.event, message.data);
});

io.on('connection', function(socket) {
  console.log('a connection was established');
});

server.listen(3000, function(){
    console.log('Listening on Port 3000');
});