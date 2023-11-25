const express = require('express') ;
const { adminSetqr, adminCheckqr, updateMenu } = require('../../controllers/admin/adminOps');
const router = express.Router()

router.route('/set-time/:email').post(adminSetqr) ;
router.route('/update-hostel-menu/:email').post(updateMenu) ;

module.exports = router ;