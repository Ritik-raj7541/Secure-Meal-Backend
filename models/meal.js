const mongoose = require('mongoose') ;

const meal = {
      breakfast: {
            type: String,
      },
      lunch: {
            type: String, 
      },
      snacks: {
            type: String,
      },
      dinner: {
            type: String,
      },
} ;
const mealSchema = mongoose.Schema({
      email : {
            type: String,
            required: true,
      },
      Monday: {
            meal,
      },
      Tuesday: {
            meal,
      },
      Wednesday: {
            meal,
      },
      Thrusday: {
            meal,
      },
      Friday: {
            meal,
      },
      Saturday: {
            meal,
      },
      Sunday: {
            meal,
      },
}) ;

module.exports = mongoose.model("MealSchema", mealSchema) ;