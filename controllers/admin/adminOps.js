const asyncHandler = require("express-async-handler");
const { qrAssignor } = require("../../middleWare/qrAssignor");
const { setSomeValue } = require("../../config/globalVariables");

// 1. POST
// Desc -> it set qr code for each student of particular hostel
// Input -> time of all the meal
// url -> /api/operation/admin/set-time/:email

const adminSetqr = asyncHandler(async (req, res) => {
  const email = req.params.email ;
  const hostel = Number(email.substring(0, 2));
  const {
    mealOneS,
    mealOneE,
    mealTwoS,
    mealTwoE,
    mealThreeS,
    mealThreeE,
    mealFourS,
    mealFourE,
  } = req.body;

  const mealTime = {
      mealOneS,
      mealOneE,
      mealTwoS,
      mealTwoE,
      mealThreeS,
      mealThreeE,
      mealFourS,
      mealFourE,
  }
  setSomeValue(mealTime);
  //set time 15 min before
  if (mealOneS && mealOneE) {
    const validTime = {
      startTime: mealOneS,
      endTime: mealOneE,
    };
    const status = await qrAssignor(validTime, 1, hostel);
  }
  if (mealTwoS && mealTwoE) {
    const validTime = {
      startTime: mealOneS,
      endTime: mealOneE,
    };
    const status = await qrAssignor(validTime, 2, hostel);
  }
  if (mealThreeS && mealThreeE) {
    const validTime = {
      startTime: mealOneS,
      endTime: mealOneE,
    };
    const status = await qrAssignor(validTime, 3, hostel);
  }
  if (mealFourS && mealFourE) {
    const validTime = {
      startTime: mealOneS,
      endTime: mealOneE,
    };
    const status = await qrAssignor(validTime, 4, hostel);
  }
  res.status(200).json({message:"Token generation for each student have been initiated"})
});
// 1. POST
// url -> /api/operation/admin/verify-student
const adminCheckqr = asyncHandler(async (req, res) => {
  const { data } = req.body();
});

module.exports = { adminSetqr };
