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



var userlist = [];

io.on('connection', function(socket){
	socket.on('join', function(data){
    	userlist.push(data.user);
    	socket.user = data.user;
    	socket.roomname = data.roomname;
		socket.join(socket.roomname);

    	data.userlist = userlist;
		socket.to(socket.roomname).emit('join message', data);
		socket.emit('join message', data);
	});

	socket.on('send', function(data){
		socket.to(socket.roomname).emit('send message', data);
		socket.emit('send message', data);
	});

	socket.on('disconnect', function(){
		console.log('disconnect');
		
		userlist = userlist.filter(function(v, i){
			return v !== socket.user;
		});

		socket.to(socket.roomname).emit('leave', 
        	{'userlist': userlist, 'user': socket.user}
		);
		socket.leave(socket.roomname);
	});
});


