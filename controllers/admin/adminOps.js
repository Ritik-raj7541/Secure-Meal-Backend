const asyncHandler = require("express-async-handler");

const { qrAssignor } = require("../../middleWare/qrAssignor");
const { setSomeValue } = require("../../config/globalVariables");

const meal = require("../../models/meal");

// 1. POST
// Desc -> it set qr code for each student of particular hostel
// Input -> time of all the meal
// url -> /api/operation/admin/set-time/:email

const adminSetqr = asyncHandler(async (req, res) => {
  const email = req.params.email;
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
  };
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
  res
    .status(200)
    .json({ message: "Token generation for each student have been initiated" });
});
// 1. POST
// url -> /api/operation/admin/verify-student
const adminCheckqr = asyncHandler(async (req, res) => {
  const { data } = req.body();
});

//2. POST
// url -> /api/operation/admin/update-hostel-menu/:email
const updateMenu = asyncHandler(async (req, res) => {
  const email = req.params.email;
  const hostel = await meal.findOne({ email });
  const menu = req.body;
  if (hostel) {
    const updatedMeal = await meal.findOneAndUpdate({email}, {routine:menu}) ;
    if(updateMenu){
      res.status(200).json({ message: "updated" });
    }
    else{
      res.status(401);
      throw new Error("some internal error");
    }
  } else {
    const newMeal = await meal.create({
      email,
      routine: menu,
    });
    if (newMeal) {
      res.status(200).json({ message: "successfully created for new hostel" });
    } else {
      res.status(401);
      throw new Error("some internal error");
    }
  }
});

module.exports = { adminSetqr, adminCheckqr, updateMenu };
