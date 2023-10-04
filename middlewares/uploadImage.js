const multer = require("multer")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "imageUploads")
  },

  filename: function (req, file, cb) {
    const imgName = `${Date.now()}-${
      file.originalname
    }`
    cb(null, imgName)
  },
})

var multerFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({
  storage: storage,
  fileFilter: multerFilter,
})

module.exports = upload
