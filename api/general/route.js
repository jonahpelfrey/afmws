var express = require('express');
var router = express.Router();
var controller = require('./controller.js');

router.get('/main', controller.showDashboard);
router.get('/import', controller.importMembers);

module.exports = router;