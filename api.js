const express = require("express")
const app = express()
const allRoute = require("./src/route/index")
const cookieParser = require('cookie-parser')


app.use(express.json())
app.use(allRoute)
// to parse a data  into cookie and send it the server
app.use(cookieParser())


module.exports = {app}