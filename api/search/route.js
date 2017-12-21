'use strict';

/** 
 * =============================================================================
 * Imports
 * =============================================================================
 */
var express = require('express');
var controller = require('./controller');
var router = express.Router();


/** 
 * =============================================================================
 * Routes
 * =============================================================================
 */
router.get('/artists/:searchTerm', controller.searchArtists);
router.get('/volunteers/:searchTerm', controller.searchVolunteers);
router.get('/buyers/:searchTerm', controller.searchBuyers);

module.exports = router;