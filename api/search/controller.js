'use strict';
/** 
 * =============================================================================
 * Imports
 * =============================================================================
 */
var Artist 		= require('../../models/artist.js');
var Volunteer 	= require('../../models/volunteer.js');
var Buyer 		= require('../../models/buyer.js');

var Q 			= require('q');

/** 
 * =============================================================================
 * Public Functions
 * =============================================================================
 */
exports.searchArtists = function(req, res) {

	var searchTerm = req.params.searchTerm;

	Artist.find({'lastName': {'$regex': searchTerm, '$options': 'i'}})
	.limit(10)
	.then(function(resp){
		res.send(resp);
	}, function(err){
		res.send(err);
	});
}

exports.searchVolunteers = function(req, res) {

	var searchTerm = req.params.searchTerm;

	Volunteer.find({'lastName': {'$regex': searchTerm, '$options': 'i'}})
	.limit(10)
	.then(function(resp){
		res.send(resp);
	}, function(err){
		res.send(err);
	});
}

exports.searchBuyers = function(req, res) {

	var searchTerm = req.params.searchTerm;

	Buyer.find({'lastName': {'$regex': searchTerm, '$options': 'i'}})
	.limit(10)
	.then(function(resp){
		res.send(resp);
	}, function(err){
		res.send(err);
	});
}



