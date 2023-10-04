const fs = require("fs")
const Car = require("../models/carsModel")

const createCar = async (req, res) => {
  try {
    if (!req.file)
      return res.send("Please upload a file")

    const newCar = await Car.create({
      ...req.body,
      date: new Date().toString(),
      img: req.file.path,
    })
    res.status(201).json({
      status: "success",
      data: {
        Car: newCar,
      },
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const getAllCars = async (req, res) => {
  try {
    const { category, nameSearch } = req.query
    const condition = {}
    if (category) {
      condition.size = category
    }
    if (nameSearch) {
      condition.name = {
        $regex: ".*" + nameSearch + ".*",
        $options: "i",
      }
    }

    const Cars = await Car.find(condition)

    res.status(200).json({
      status: "success",
      requestTime: req.requestTime,
      length: Cars.length,
      data: {
        Cars,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const getCarById = async (req, res) => {
  try {
    const Car = await Car.findById(req.params.id)

    res.status(200).json({
      status: "success",
      data: {
        Car,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "success",
      message: err.message,
    })
  }
}

const editCar = async (req, res) => {
  try {
    const id = req.params.id

    const Car = await Car.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    )

    res.status(201).json({
      status: "success",
      data: {
        Car: Car,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const removeCar = async (req, res) => {
  try {
    const id = req.params.id

    const CarById = await Car.findById(id)
    var image = CarById.img
    fs.unlink(image, (err) => {
      if (err) throw err
      console.log("successfully deleted file")
    })

    const Car = await Car.findByIdAndRemove(id)

    // validator
    if (!Car) {
      return res.status(400).json({
        status: "failed",
        message:
          "data with this id is not defined",
      })
    }

    res.status(201).json({
      status: "success",
      message: "data sudah berhasil di hapus",
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

module.exports = {
  getAllCars,
  getCarById,
  createCar,
  editCar,
  removeCar,
}
