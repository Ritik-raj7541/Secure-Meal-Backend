const asyncHandler = require('express-async-handler') ;

//0. check port
// GET - api/operation/student/get-details
const check = asyncHandler( async(req, res) => {
      res.status(200).json({message:"ritik is alright"}) ;
}) ;

module.exports = {check} ;