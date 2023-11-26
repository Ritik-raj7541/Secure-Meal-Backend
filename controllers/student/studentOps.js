const asyncHandler = require("express-async-handler");
const QRCs = require("../../models/qrCodes");
const { dateFormatter } = require("../../middleWare/dateFormatter");
const { getSomeValue } = require("../../config/globalVariables");

//0. check port
// GET - api/operation/student/get-details
const check = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "ritik is alright" });
});

// 1. get my qr code
// GET -api/operation/student/get-my-qr/:email
const getQR = asyncHandler(async (req, res) => {
  const userEmail = req.params.email;
  const dt = new Date();
  dt.setHours(0, 0, 0, 0);
  const dateNow = await dateFormatter(dt);

  const user = await QRCs.findOne({ email: userEmail });
  const len = user.studentQr.length;
  if (user && len === 0)
    res.status(200).json({ message: "token not assigned yet" });

  const { date, qrCode1, qrCode2, qrCode3, qrCode4 } = user.studentQr[len - 1];
  if (date == dateNow) {
    const result = {
      date,
      qrCode1,
      qrCode2,
      qrCode3,
      qrCode4,
    };
    res.status(200).json(result);
  }
  else{
    res.status(200).json({ message: "not generated" });
  }
});

//2. get menu
// GET - api/operation/student/get-meal-timetable
module.exports = { check, getQR };
