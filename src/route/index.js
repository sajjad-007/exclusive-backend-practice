const express = require("express")
const route = express.Router() 
const authRoutes = require("./regRoute")
const categoryRoute = require("./category.api.Rote")

route.use("/home/api",authRoutes)
route.use("/home/api",categoryRoute)


module.exports = route;





