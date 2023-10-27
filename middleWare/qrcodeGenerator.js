//return only qr code
const qrcode = require('qrcode') ;
const asyncHandler = require('express-async-handler') ;

const genQRcode = asyncHandler( async (element, validTime) =>{
            data = {
                  studentDetails: element,
                  validitiy: validTime
            }
            const jsonData = JSON.stringify(data) ;
            const qrDataUrl = await qrcode.toDataURL(jsonData) ; 

            return qrDataUrl ;
}) ;

module.exports = {genQRcode} ;