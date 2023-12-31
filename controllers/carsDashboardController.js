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
    res.redirect("..")
  }
}
const createCarsPage = async (req, res) => {
  try {
    const error = req.flash("error", "")
    res.render("create", {
      error: error,
    })
  } catch (err) {
    res.redirect("..")
  }
}

const editCarsPage = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
    res.render("edit", { car: car })
  } catch (err) {
    res.redirect("..")
  }
}

const createCar = async (req, res) => {
  try {
    let date = new Date()

    let day = date.getDate()
    let month = date.toLocaleString("default", {
      month: "long",
    })
    let year = date.getFullYear()

    await Car.create({
      name: req.body.name,
      price: req.body.price,
      size: req.body.size,
      date: `${day} ${month} ${year}`,
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

const editCar = async (req, res) => {
  try {
    const id = req.params.id
    let date = new Date()

    let day = date.getDate()
    let month = date.toLocaleString("default", {
      month: "long",
    })
    let year = date.getFullYear()

    if (req.file) {
      const CarById = await Car.findById(id)

      var image = CarById.img

      fs.unlink(image, (err) => {
        if (err) throw err
        console.log("successfully deleted file")
      })

      await Car.findByIdAndUpdate(id, {
        ...req.body,
        date: `${day} ${month} ${year}`,
        img: req.file.path,
      })
    }

    await Car.findByIdAndUpdate(id, {
      ...req.body,
      date: `${day} ${month} ${year}`,
    })

    req.flash("message", "Diubah")
    req.flash("messageType", "success")

    res.redirect("/")
  } catch (err) {
    console.log(err)
    req.flash("error", "please upload an image")
    res.redirect("..")
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
    console.log(err)
    req.flash("error", "failed to remove data")
    res.redirect("/")
  }
}

module.exports = {
  getAllCars,
  createCarsPage,
  editCarsPage,
  createCar,
  editCar,
  removeCar,
}
