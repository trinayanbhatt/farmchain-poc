	'use strict';

	let errors = require('./errors.js');
	var request = require("request");
	let config = require('config');

	var auth = 'Basic ' + Buffer.from(config.user + ':' + config.pass).toString('base64');
	var url = config.url;
	var chain = config.chain;

	var options = { method: 'POST',
		url: url,
		headers: 
		 { 'cache-control': 'no-cache',
				Authorization : auth,
			 'Content-Type': 'application/json' },
		body: { method: 'importaddress', params: ["address"], chain_name: chain },
		json: true };

	exports.findAll = (req, res, next) => {
		// Simulate task list, normally this would be retrieved from a database
		let createkeypairs ;

	request(options, function (error, response, body) {
		if (error) throw new Error(error);

		console.log(body);
		res.json(body);
	});
	};

	exports.buggyRoute = (req, res, next) => {
		// Simulate a custom error
		next(errors.newHttpError(400, 'bad request'));
	};