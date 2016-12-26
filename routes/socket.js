'use strict';

var express = require('express');
var net = require('net');

var router = express.Router();

router.get('/client', function(req, res, next){
	var client = net.connect({port:8107, host:'localhost'}, function(){
		console.log('client connected =======');
		client.write('data : \r\n');
	});

    client.setTimeout(500);
    client.setEncoding('utf8');
	client.on('data', function(data){
		console.log('data>>>>')
		console.log(data.toString());
		client.end();
	});
	client.on('end', function(){
		console.log('client disconnected =====');
	});
	client.on('error', function(err){
		console.log('sokect err: ' + JSON.stringify(err));
	});
	client.on('timeout', function(){
		console.log('timeout');
	});
	client.on('close', function(){
		console.log('socket close');
	});
});

router.get('/server', function(req, res, next){
	var server = net.createServer(function(client){
		console.log('client connected =======');

		client.on('data', function(data){
			console.log('client sent>>>>');
			console.log(data.toString());
		});

		client.on('end', function(){
			console.log('client disconnected =====');
		});

		client.write('hello..');
		client.write('hello..');
		client.write('hello..');
		client.write('hello..');
		client.write('hello..');
	});

	server.listen(8107, function(){
		console.log('server listening....')
	});

});


module.exports = router;
