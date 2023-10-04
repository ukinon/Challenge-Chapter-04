const mongoose = require("mongoose")

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
  },
  size: {
    type: String,
    required: [true, "Size is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  date: {
    type: String,
    required: [true, "Date is required"],
  },
  img: {
    type: String,
  },
})

const Car = mongoose.model("cars", tourSchema)

module.exports = Car
