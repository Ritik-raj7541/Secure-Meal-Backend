const express = require('express') ;
const { adminSetqr } = require('../../controllers/admin/adminOps');
const router = express.Router()

router.route('/set-time/:email').post(adminSetqr) ;

module.exports = router ;