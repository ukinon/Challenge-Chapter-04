const express = require("express")
const carsController = require("../controllers/carsController")
const upload = require("../middlewares/uploadImage")

const router = express.Router()

// router.param("id", carsController.checkId)

router
  .route("/")
  .get(carsController.getAllCars)
  .post(
    upload.single("image"),
    carsController.createCar
  )

router
  .route("/:id")
  .get(carsController.getCarById)
  .patch(
    upload.single("image"),
    carsController.editCar
  )
  .delete(carsController.removeCar)

module.exports = router
