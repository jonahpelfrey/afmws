'use strict';

/** 
* =============================================================================
* Imports
* =============================================================================
*/
var jfw = require('jsonfile');
var file = '../../data.json';

var Converter = require('csvtojson').Converter;
var converter = new Converter({});


/** 
* =============================================================================
* Public Functions
* =============================================================================
*/
exports.showDashboard = function(req, res){

	if(req.session.views){
		req.session.views++;
		req.session.save();
		res.end("Dashboard Route | Views: " + req.session.views);
	}
	else {
		req.session.views = 1;
		req.session.save();
		res.end("Dashboard Route");
	}
}

exports.importMembers = function(req, res){
	converter.fromFile("./members.csv", function(err, result){
	if(err){res.send(err);}

	var json = result;
	jfw.writeFile(file, result, {spaces: 2}, function(err){
		if(err){console.log(err);}
	});

});
}