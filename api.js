const express = require("express")
const app = express()
const allRoute = require("./src/route/index")

app.use(express.json())
app.use(allRoute)


module.exports = {app}