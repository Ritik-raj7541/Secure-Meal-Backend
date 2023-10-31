const asyncHandler = require("express-async-handler");
const { qrAssignor } = require("../../middleWare/qrAssignor");
const { setSomeValue } = require("../../config/globalVariables");

// 1. POST
// url -> /api/operation/admin/set-time
const adminSetqr = asyncHandler(async (req, res) => {
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
    const status = await qrAssignor(validTime, 1);
  }
  if (mealTwoS && mealTwoE) {
    const validTime = {
      startTime: mealOneS,
      endTime: mealOneE,
    };
    const status = await qrAssignor(validTime, 2);
  }
  if (mealThreeS && mealThreeE) {
    const validTime = {
      startTime: mealOneS,
      endTime: mealOneE,
    };
    const status = await qrAssignor(validTime, 3);
  }
  if (mealFourS && mealFourE) {
    const validTime = {
      startTime: mealOneS,
      endTime: mealOneE,
    };
    const status = await qrAssignor(validTime, 4);
  }
  res.status(200).json({message:"Token generation for each student have been initiated"})
});
// 1. POST
// url -> /api/operation/admin/verify-student
const adminCheckqr = asyncHandler(async (req, res) => {
  const { data } = req.body();
});

module.exports = { adminSetqr };
