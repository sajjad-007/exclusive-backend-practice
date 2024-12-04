const express = require("express")
const app = express()
const allRoute = require("./src/route/index")
const cookieParser = require('cookie-parser')


app.use(express.json())
app.use(allRoute)
// to parse a data  into cookie and send it the server
app.use(cookieParser())

//static image gulo local browser e dekhar jonno
app.use("/static/image",express.static("public/temp")) 

module.exports = {app}