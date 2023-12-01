const express = require('express') ;
const { getQR, getMenu, check, postReview } = require('../../controllers/student/studentOps');
const router = express.Router() ;

router.route('/get-details/:email').get(check) ;
router.route('/get-my-qr/:email').get(getQR) ;
router.route('/get-meal-timetable/:email').get(getMenu) ;
router.route('/write-review/:email').post(postReview) ;
module.exports = router ;