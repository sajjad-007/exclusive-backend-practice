const mongoose = require("mongoose")
const { Schema } = mongoose;

const MySchema = new Schema({
    firstName:{
        type: String,
        required: true,
        trim: true,
    },
    lastName:{
        type: String,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    phoneNumber:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    otp: {
        type: Number,
    },
    address:{
        type: String,
        required: true,
        trim: true,
    },
    verfied:{
        type: Boolean,
    },
    image:{
        type: String,
    },
    role:{
        type: String,
        default: "user",
        /* enum: {user,admin,merchent},*/
    },

},
    {timestamps: true}
)

const userModal = mongoose.model("user", MySchema)

module.exports = {userModal}