/** 
* =============================================================================
* Imports
* =============================================================================
*/
require('dotenv').config();

var express 	= require('express');
var session		= require('express-session');
var Q 			= require('q');
var app 		= express();
var morgan 		= require('morgan');
var path		= require('path');
var mongoose 	= require('mongoose');
var bodyParser 	= require('body-parser');
var server 		= require('http').createServer(app);
var io 			= require('socket.io')(server);
var seed 		= require('./seed.js');
var members		= require('./convert.js');

var SessionManager 	= require('./session/session')(app);
var SocketManager	= require('./socket/socket')(io);

/** 
* =============================================================================
* API
* =============================================================================
*/
var Artist 		= require('./models/artist.js');
var Buyer      	= require('./models/buyer.js');
var Volunteer 	= require('./models/volunteer.js');
var Order 		= require('./models/order.js');

 
/** 
* =============================================================================
* Database
* =============================================================================
*/
mongoose.connect(process.env.MONGODB_URI || process.env.DB_HOST);
// mongoose.connect("mongodb://localhost/afmws");
mongoose.Promise = require('q').Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to DB");

    // seed.generateModels();
    // seed.createGroup();
    // members.importMembers().then(function(result){
    // 	console.log("Status: " + result.message);
    // });
});


/** 
* =============================================================================
* Config
* =============================================================================
*/
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
}

app.use(allowCrossDomain);
// app.use(express.static(path.join(__dirname, '/../public/dist'))); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




/** 
* =============================================================================
* Middleware
* =============================================================================
*/



/** 
* =============================================================================
* Sockets
* =============================================================================
*/
// SocketManager.initialize();


/** 
* =============================================================================
* Tracking
* =============================================================================
*/
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));


/** 
* =============================================================================
* Routes
* =============================================================================
*/
app.use('/api/buyers', require('./api/buyers/route'));
app.use('/api/artists', require('./api/artists/route'));
app.use('/api/orders', require('./api/orders/route'));
app.use('/api/volunteers', require('./api/volunteers/route'));
app.use('/api/dashboard', require('./api/general/route'));
app.use('/api/search', require('./api/search/route'));

app.get('*', (req, res) => {
  res.send("Welcome to the artfair web service API");
});

/** 
* =============================================================================
* Final Setup
* =============================================================================
*/
module.exports = app;
server.listen(process.env.PORT || '8080');
console.log('Server Running');


