'use strict';

var express = require('express');
var stream = require('stream');
var util = require('util');

var router = express.Router();


router.get('/readable', function(req, res, next){
	util.inherits(Reader, stream.Readable);
	
	function Reader(opt) {
		stream.Readable.call(this, opt);
		this.quotes = ["yes", "no", "maybe"];
		this._index = 0;
	}

	Reader.prototype._read = function() {
		if (this._index > this.quotes.length){
			this.push(null);
		} else {
			this.push(this.quotes[this._index]);
			this._index += 1;
		}
	};

	var r = new Reader();
	console.log("Direct read: " + r.read().toString());
	r.on('data', function(data){
		console.log("Callback read: " + data.toString());
	});
	r.on('end', function(data){
		console.log("No more answers.");
	});
});



router.get('/writeable', function(req, res, next){
	util.inherits(Writer, stream.Writable);

	function Writer(opt){
		stream.Writable.call(this, opt);
		this.data = new Array();
	}

	Writer.prototype._write = function(data, encoding, callback){
		this.data.push(data.toString('utf8'));
		console.log("Adding: " + data);
		callback();
	};

	var w = new Writer();
	for(var i=1; i<=5; i++){
		w.write("Item: " + i, 'utf8');
	}

	w.end("Item End!!");
	console.log(w.data);
});


router.get('/duplex', function(req, res, next){
	util.inherits(Duplexer, stream.Duplex);

	function Duplexer(opt){
		stream.Duplex.call(this, opt);
		this.data = [];
	}

	Duplexer.prototype._read = function(size){
		var chunk = this.data.shift();
		if(chunk == "stop"){
			this.push(null);
		} else{
			if(chunk){
				this.push(chunk);
			} else{
				setTimeout(readitem.bind(this), 500, size);
			}
		}
	};

	Duplexer.prototype._write = function(data, encoding, callback){
		this.data.push(data);
		callback();
	}

	var d = new Duplexer();
	d.on('data', function(chunk){
		console.log("read: ", chunk.toString());
	})	
	d.on('end', function(){
		console.log('Message complete');
	});

	d.write('1');
	d.write('2');
	d.write('stop');
	d.write('4');
	d.write('5');
});



























module.exports = router;