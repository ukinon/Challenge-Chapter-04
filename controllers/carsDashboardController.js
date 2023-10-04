const Car = require(".././models/carsModel")
const fs = require("fs")

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
    const cars = await Car.find(condition)
    const message = req.flash("message", "")
    const messageType = req.flash(
      "messageType",
      ""
    )
    res.render("index", {
      cars: cars,
      fullUrl:
        req.protocol +
        "://" +
        req.get("host") +
        req.originalUrl,
      message: message,
      messageType: messageType,
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}
const createCarsPage = async (req, res) => {
  try {
    const date = new Date().toISOString()
    const error = req.flash("error", "")
    res.render("create", {
      date: date,
      error: error,
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const editCarsPage = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
    res.render("edit", { car: car })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const createCar = async (req, res) => {
  try {
    await Car.create({
      name: req.body.name,
      price: req.body.price,
      size: req.body.size,
      date: req.body.date,
      img: req.file.path,
    })
    req.flash("message", "Ditambah")
    req.flash("messageType", "success")
    res.redirect("/")
  } catch (err) {
    console.log(err)
    req.flash("error", "please upload an image")
    res.redirect("/create")
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

    await Car.findByIdAndUpdate(id, req.body)

    req.flash("message", "Diubah")
    req.flash("messageType", "success")

    res.redirect("/")
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

    const carById = await Car.findById(id)
    var image = carById.img
    fs.unlink(image, (err) => {
      if (err) throw err
      console.log("successfully deleted file")
    })

    await Car.findByIdAndRemove(id)

    req.flash("message", "Dihapus")
    req.flash("messageType", "success")

    res.redirect("/")
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

module.exports = {
  getAllCars,
  createCarsPage,
  editCarsPage,
  getCarById,
  createCar,
  editCar,
  removeCar,
}
