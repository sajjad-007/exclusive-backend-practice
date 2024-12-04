const express = require("express")
const _ = express.Router()
const{ categoryController } =require("../controller/categoryController")
const { upload } = require("../middleware/middleware.multer")

_.route("/category").post(upload.fields(
    [
        {name: "image", maxCount: 1}
    ]
),categoryController)

module.exports = _