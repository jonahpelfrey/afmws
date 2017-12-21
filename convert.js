'use strict';
/** 
 * =============================================================================
 * Imports
 * =============================================================================
 */
var Q = require('q');
var Buyer = require('./models/buyer.js');

const jfw = require('jsonfile');
const Converter = require('csvtojson').Converter;
const file = './data.json';

/** 
 * =============================================================================
 * Public Functions
 * =============================================================================
 */
exports.importMembers = function(){

	var p = Q.defer();
	const converter = new Converter({});

	converter.fromFile("./members.csv", function(err, result){
		var json = result;
		if(err){
			console.log(err); 
			p.reject(err); 
		}
		else {
			for(var i = 0; i < json.length; i++){
				
				let b = new Buyer();
				b.member = true;

				b.firstName = json[i].mFirst;
				b.lastName = json[i].mLast;

				b.address.street = json[i].addFirst;
				b.address.city = json[i].city;
				b.address.state = json[i].state;
				b.address.zip = json[i].zip;

				if(json[i].phone != "" && json[i].phone){ b.phoneNumber = json[i].phone; }
				else if(json[i].mCell != "" && json[i].mCell){ b.phoneNumber = json[i].mCell; }
				else if(json[i].sCell != "" && json[i].sCell){ b.phoneNumber = json[i].sCell; }
				else { b.phoneNumber = "000-000-0000"; }

				if(json[i].mEmail != "" && json[i].mEmail){ b.email = json[i].mEmail; }
				else{ b.email = "blank@blank.com"; }

				b.save(function(err, buyer){
					if(err){
						console.log(err);
						p.reject(err); 
					}
				}); 
			}
			p.resolve({message: "Success"});
		}
	});

	return p.promise;
}

// exports.membersToJson = function(){
// 	converter.fromFile("./members.csv", function(err, result){
// 		if(err){console.log(err);}

// 		var json = result;
// 		jfw.writeFile(file, result, {spaces: 2}, function(err){
// 			if(err){console.log(err);}
// 			else {
// 				jfw.readFile(file, function(err, obj){
// 					if(err){console.log(err);}
// 					else {
// 						console.log(obj.length);
// 					}
// 				});
// 			}
// 		});
// 	});
// }



