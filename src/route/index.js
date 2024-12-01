const express = require("express")
const route = express.Router() 
const mainRoutes = require("./regRoute")

route.use("/home/auth",mainRoutes)


module.exports = route;





