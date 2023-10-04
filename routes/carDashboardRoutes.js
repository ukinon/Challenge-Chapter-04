const express = require("express")
const carsController = require("../controllers/carsDashboardController")
const upload = require("../middlewares/uploadImage")

const router = express.Router()

router.route("/").get(carsController.getAllCars)
router
  .route("/create")
  .get(carsController.createCarsPage)
  .post(
    upload.single("image"),
    carsController.createCar
  )

router
  .route("/delete/:id")
  .get(carsController.removeCar)

router
  .route("/edit/:id")
  .get(carsController.editCarsPage)
  .post(
    upload.single("image"),
    carsController.editCar
  )

module.exports = router
