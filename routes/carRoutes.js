const express = require("express")
const carsController = require("../controllers/carsController")
const upload = require("../middlewares/uploadImage")

const router = express.Router()

// router.param("id", carsController.checkId)

router
  .route("/")
  .get(carsController.getAllTours)
  .post(
    upload.single("image"),
    carsController.createTour
  )

router
  .route("/:id")
  .get(carsController.getTourById)
  .patch(carsController.editTour)
  .delete(carsController.removeTour)

module.exports = router
