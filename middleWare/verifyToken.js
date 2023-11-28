const asyncHandler = require("express-async-handler");

const {dateFormatter} = require('../middleWare/dateFormatter') ;

const QRCs = require('../models/qrCodes') ;

const verifyTokens = asyncHandler(async (validTime, date) => {
  let currentDate = new Date();
  let hour = currentDate.getHours();
  const dt = new Date();
  dt.setHours(0, 0, 0, 0);
  const dateNow = await dateFormatter(dt);
  console.log(Number(validTime.startTime), hour, Number(validTime.endTime));
  if (dateNow === date && hour >= Number(validTime.startTime) && hour <= Number(validTime.endTime)) {
    return true;
  }
  return false;
});

const updateQR = asyncHandler( async(email, hostelNumber, mealNumber) =>{
    const codeNumber = 'qrCode'+mealNumber ;
    const student = await QRCs.findOne({email, hostelNumber}) ;
    const len = student.studentQr.length-1 ;
    if(mealNumber===1 && student.studentQr[len].qrCode1.code === null){
      return false ;
    }else if(mealNumber === 2 && student.studentQr[len].qrCode2.code === null){
      return false ;
    }else if(mealNumber === 3 && student.studentQr[len].qrCode3.code === null){
      return false ;
    }else if(mealNumber === 4 && student.studentQr[len].qrCode4.code === null){
      return false ;
    }
    const updation = await QRCs.findOneAndUpdate(
      {email,hostelNumber},
      {
        $set:{
          [`studentQr.$[elem].${codeNumber}`]:{
            code:null,
            status: true,
          }
        }
      },
      {
        arrayFilters: [{ 'elem': { $exists: true } }],
        new: true
      },
    ) ;
    if(updation) return true ;
    return false ;
}) ;

module.exports = { verifyTokens, updateQR };
