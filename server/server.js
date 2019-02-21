'use strict';


// API boilerplate
let express = require('express');
let app = express();
let routes = require('./routes');
const cors = require('cors'); // addition we make
const fileUpload = require('express-fileupload'); //addition we make

// Logging
let bodyParser = require('body-parser');
let morgan = require('morgan');
let fs = require('fs');
let FileStreamRotator = require('file-stream-rotator');
let logDirectory = __dirname + '/log';

// Config
let config = require('config');

// BodyParser allows us to get data out of URLs
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Use CORS and File Upload modules here
app.use(cors());
app.use(fileUpload());


// Log all requests in a daily log file using morgan
if (fs.existsSync(logDirectory) === false) {
  fs.mkdirSync(logDirectory);
}
let accessLogStream = FileStreamRotator.getStream({
  filename: logDirectory + '/access-%DATE%.log',
  frequency: 'daily',
  date_format: "YYYYMMDD",
  verbose: false
});
app.use(morgan('combined', {stream: accessLogStream}));

// Load up the routes
app.use('/', routes);



// app.get('/hello', (req, res) => {
//   res.send({ express: 'Hello From Express' });
// });

// app.post('/createkeypairs', (req, res) => {
//   console.log(req.body);
//   res.send(
//     `I received your POST request. This is what you sent me: ${req.body.post}`,
//   );
// });

// Start the API
app.listen(config.apiPort);
console.log("API running on port " + config.apiPort);
console.log("running server here ");


// Export API server for testing
module.exports = app;
