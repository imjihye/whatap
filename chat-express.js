var express = require('express');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');

server.listen(3033, function(){
	console.log('Server listening at port %d', server.address().port);
});

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res){
	res.render('chat-express.hbs');
});

io.on('connection', function(socket){
	socket.on('join', function(data){
    	socket.user = data.user;
    	socket.roomname = data.roomname;

		socket.join(socket.roomname);
		socket.in(socket.roomname).emit('join message', data);
	});

	socket.on('send', function(data){
		socket.in(socket.roomname).emit('send message', data);
	});

	socket.on('disconnect', function(){
		console.log('disconnect');
		socket.in(socket.roomname).emit('leave', socket.user);
		socket.leave(socket.roomname);
	});
});


