'use strict';

let router = require('express').Router();

// Middleware
let middleware = require('./controllers/middleware');
router.use(middleware.doSomethingInteresting);

// Tasks
//let tasks = require('./controllers/tasks');
let createkeypairs = require('./controllers/getaddress');

// let importaddress = require('./controllers/importaddress');
// let getwalletinfo = require('./controllers/getwalletinfo');

//router.get('/tasks', tasks.findAll2);
router.get('/createkeypairs', createkeypairs.findAll);

// router.get('/importaddress', importaddress.findAll);
// router.get('/getwalletinfo', getwalletinfo.findAll);
// router.post('/buggyroute', tasks.buggyRoute);

//let importaddress = require('./controllers/importaddress');
//let getwalletinfo = require('./controllers/getwalletinfo');

//router.get('/tasks', tasks.findAll2);
router.post('/createkeypairs', createkeypairs.findAll);
//router.get('/importaddress', importaddress.findAll);
//router.get('/getwalletinfo', getwalletinfo.findAll);
//router.post('/buggyroute', tasks.buggyRoute);


// Error Handling
let errors = require('./controllers/errors');
router.use(errors.errorHandler);

// Request was not picked up by a route, send 404
router.use(errors.nullRoute);

// Export the router
module.exports = router;
