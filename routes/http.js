'use strict';

var express = require('express');
var http = require('http');

var router = express.Router();

router.get('/client', function(req, res, next){
	var options = {
		host: 'www.naver.com',
		// host: 'www.whatap.io',
		path: '/',
		port: '80',
		method: 'GET'
	};

	var callback = function(response){
		var str = '';
		response.on('data', function(chunk){
			str += chunk;
		});
		response.on('end', function(){
			console.log(str);
		});
	};	

	http.request(options, callback).end();
});


router.get('/server', function(req, res, next){
	var messages = ['a', 'b', 'c'];
	var serverListener = function(req, res){
		res.setHeader("Content-Type", 'text/html');
		res.writeHead(200);
		for(var idx in messages){
			res.write(messages[idx]);
		}
		res.end('/...hello!');
	}

	http.createServer(serverListener).listen(8080);
});

module.exports = router;
