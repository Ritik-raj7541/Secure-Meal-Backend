const asyncHandler = require('express-async-handler') ;
const Student = require('../../models/student') ;
const {genQRcode} = require('../../middleWare/qrcodeGenerator') ;

// 1. POST
// url -> /api/operation/admin/set-time
const adminSetqr = asyncHandler( async(req, res) =>{
      const {mealOneS, mealOneE} = req.body ;

      //set time 15 min before
      if(mealOneS && mealOneE){
            const validTime = {
                  startTime : mealOneS,
                  endTime : mealOneE
            }
            
            const allStudent = await Student.find() ;
            for (let index = 0; index < allStudent.length; index++) {
                  const element = allStudent[index];
                  const code = await genQRcode(element, validTime) ;
                  console.log(element.id);
            }
            res.status(200).json({message: "good"})
      }
      // if(mealTwoS && mealTwoE){
            
      // }
      // if(mealThreeS && mealThreeE){
            
      // }
      // if(mealFourS && mealFourE){
            
      // }
}) ;
// 1. POST
// url -> /api/operation/admin/verify-student
const adminCheckqr = asyncHandler( async(req, res) =>{
      const {data} = req.body() ;
      
}) ;

module.exports = {adminSetqr} ;