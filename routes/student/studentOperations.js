const express = require('express') ;
const { getQR } = require('../../controllers/student/studentOps');
const router = express.Router() ;

router.route('/get-my-qr/:email').get(getQR) ;
module.exports = router ;