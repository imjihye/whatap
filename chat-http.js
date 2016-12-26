var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(3033);

function handler(req, res){
	fs.readFile(__dirname + '/views/chat-http.html', function(err, data){
		if(err){
			res.writeHead(500);
			return res.end('Error loading html');
		}
		res.writeHead(200);
		res.end(data);
	});
}

io.on('connection', function(socket){
	socket.emit('welcome', {hello: 'world'});
	socket.on('join', function(data){
		console.log(data);
	});
});