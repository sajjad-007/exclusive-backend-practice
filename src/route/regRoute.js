const express = require("express")
const _ = express.Router()
const {registrationControl, login, otpVarify} = require("../controller/authController")

_.route("/registration").post(registrationControl)
_.route("/login").post(login)
_.route("/otp-verify").post(otpVarify)




module.exports = _;





