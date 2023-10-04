// CORE PACKAGE/MODULE

// THIRD PARTY PACKAGE/MODULE
const express = require("express")
const morgan = require("morgan")
const flash = require("connect-flash")
const session = require("express-session")
const bodyParser = require("body-parser")

// OUR OWN PACKAGE/MODULE
const adminRouter = require("./routes/carDashboardRoutes")
const carRouter = require("./routes/carRoutes")

const app = express()

// middleware dari express
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan("dev"))
// biar bisa baca static file
app.use(express.static(`${__dirname}/public`))
app.use(
  "/imageUploads",
  express.static(`${__dirname}/imageUploads`)
)

app.set("views", __dirname + "/views")
app.set("view engine", "ejs")

// flash and express session for notification
app.use(
  session({
    secret: "test",
    saveUninitialized: true,
    resave: true,
  })
)
app.use(flash())

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  console.log(req.requestTime)
  next()
})

app.use("/api/v1/cars", carRouter)
app.use("/", adminRouter)

module.exports = app
