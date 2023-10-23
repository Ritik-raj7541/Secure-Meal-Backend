const express = require('express') ;
const { check } = require('../../controllers/student/studentOps');
const router = express.Router() ;

router.route('/get-details').get(check) ;

module.exports = router ;