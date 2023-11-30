const express = require('express') ;
const { adminSetqr, adminCheckqr, updateMenu, getMenu } = require('../../controllers/admin/adminOps');
const router = express.Router()

router.route('/set-time/:email').post(adminSetqr) ;
router.route('/verify-student/:email').post(adminCheckqr)
router.route('/update-hostel-menu/:email').post(updateMenu) ;
router.route('/get-meal-timetable/:email').get(getMenu) ;


module.exports = router ;