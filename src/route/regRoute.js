const express = require("express")
const _ = express.Router()
const {registrationControl, login} = require("../controller/authController")

_.route("/registration").post(registrationControl)
_.route("/login").post(login)




module.exports = _;





