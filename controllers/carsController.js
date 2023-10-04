const fs = require("fs")
const Tour = require("../models/carsModel")

const createTour = async (req, res) => {
  try {
    if (!req.file)
      return res.send("Please upload a file")

    const newTour = await Tour.create({
      ...req.body,
      date: new Date().toString(),
      img: req.file.path,
    })
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
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

const getAllTours = async (req, res) => {
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

    const tours = await Tour.find(condition)

    res.status(200).json({
      status: "success",
      requestTime: req.requestTime,
      length: tours.length,
      data: {
        tours,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(
      req.params.id
    )

    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "success",
      message: err.message,
    })
  }
}

const editTour = async (req, res) => {
  try {
    const id = req.params.id

    const tour = await Tour.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    )

    res.status(201).json({
      status: "success",
      data: {
        tour: tour,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const removeTour = async (req, res) => {
  try {
    const id = req.params.id

    const tour = await Tour.findByIdAndRemove(id)

    // validator
    if (!tour) {
      return res.status(400).json({
        status: "failed",
        message:
          "data with this id is not define",
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
  getAllTours,
  getTourById,
  createTour,
  editTour,
  removeTour,
}
