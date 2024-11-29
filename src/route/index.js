const express = require("express")
const route = express.Router() 
const registration = require("./regRoute")

route.use("/home/auth",registration)


module.exports = route;





