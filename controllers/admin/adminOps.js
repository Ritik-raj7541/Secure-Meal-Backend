const asyncHandler = require("express-async-handler");
const studentCode = require("../../models/qrCodes");
const { qrAssignor } = require("../../middleWare/qrAssignor");

// 1. POST
// url -> /api/operation/admin/set-time
const adminSetqr = asyncHandler(async (req, res) => {
  const { mealOneS, mealOneE, mealTwoS, mealTwoE, mealThreeS, mealThreeE, mealFourS, mealFourE } = req.body;

  //set time 15 min before
  if (mealOneS && mealOneE) {
    const validTime = {
      startTime: mealOneS,
      endTime: mealOneE,
    };
    const status = qrAssignor(validTime, 1);

    res.status(200).json({ message: "good" });
  }
  if(mealTwoS && mealTwoE){
      const validTime = {
            startTime: mealOneS,
            endTime: mealOneE,
          };
          const status = qrAssignor(validTime, 2);
      
          res.status(200).json({ message: "good meal 2" });
  }
  if(mealThreeS && mealThreeE){
      const validTime = {
            startTime: mealOneS,
            endTime: mealOneE,
          };
          const status = qrAssignor(validTime, 3);
      
          res.status(200).json({ message: "good meal 3" });
  }
  if(mealFourS && mealFourE){
      const validTime = {
            startTime: mealOneS,
            endTime: mealOneE,
          };
          const status = qrAssignor(validTime, 4);
      
          res.status(200).json({ message: "good meal 4" });
  }
});
// 1. POST
// url -> /api/operation/admin/verify-student
const adminCheckqr = asyncHandler(async (req, res) => {
  const { data } = req.body();
});

module.exports = { adminSetqr };
