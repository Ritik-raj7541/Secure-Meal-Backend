const asyncHandler = require("express-async-handler");

const { dateFormatter } = require("../../middleWare/dateFormatter");
const { getSomeValue } = require("../../config/globalVariables");

const QRCs = require("../../models/qrCodes");
const meal = require("../../models/meal");
const Student = require("../../models/student");

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
  } else {
    res.status(401);
    throw new Error("Qr Not present");
  }
});

//2. get menu
// GET - api/operation/student/get-meal-timetable/:email
const getMenu = asyncHandler(async (req, res) => {
  const email = req.params.email;
  const hstn = email.substring(0,2) ;
  const hn = Number(hstn) ;
  let hostelNumber = 0;
  const student = await Student.findOne({ email });
  if (student) hostelNumber = student.hostelNumber;
  if (1<=hn && hn <= 13) {
    hostelNumber = hn;
  }
    const timetable = await meal.findOne({ hostelNumber: hostelNumber });
    if (timetable) {
      res.status(200).json(timetable.routine);
    } else {
      res
        .status(404)
        .json({ message: "time table is not present or not generated" });
    }
    res.status(401);
    throw new Error("User is not valid");
  
});
module.exports = { check, getQR, getMenu };
