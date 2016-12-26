'use strict';

var express = require('express');
var router = express.Router();

router.get('/get', function(req, res, next){
	var db = req.db;
	var collection = db.get('user');
	collection.find({}, { sort: {date: 1} , limit: parseInt(req.query.limit)}, function(e, result){
		res.json(result);
	});
});

router.post('/post', function(req, res, next){
	var db = req.db;
	var collection = db.get('user');
	collection.update({name: req.body.name}, {name: 'test'}, function(err, result){
		res.send('ok');
	});
});

router.put('/put', function(req, res, next){
	var db = req.db;
	var collection = db.get('user');
	collection.insert(req.body, function(err, result){
		res.send('ok');
	});
});

router.delete('/delete', function(req, rest, next){
	var db = req.db;
	var collection = db.get('user');
	collection.remove({name: req.body.name}, {},  function(err, result){
		res.send('ok');
	});
});

module.exports = router;
