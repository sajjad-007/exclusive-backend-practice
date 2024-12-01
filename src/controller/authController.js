const {successResponse} = require("../utilitis/infoResponse")
const {errorResponse} = require("../utilitis/infoErrorResponse");
const { emailChecker, passwordChecker, numberChecker } = require("../utilitis/regex");
const {userModal} = require("../modal/modalSchema")
const {sendMail} = require("../helper/nodemailer")
const { otpgenetor } = require("../helper/otpGenetor")
const {bcryptPassword,bcryptComparePassword} = require("../helper/bcrypt")
const { GenerateToken } = require("../helper/jsonWebToken")

const registrationControl = async(req,res) => {
    try {
        const {firstName,lastName,address,email,phoneNumber,password} = req.body;
        if(!firstName || !address || !email || !phoneNumber || !password){

            return res
            .status(404)
            .json(new errorResponse(404,`Enter your credential`,true,null))
        }
        if(!emailChecker(email) || !passwordChecker(password) || !numberChecker(phoneNumber)){
            
            return res
            .status(404)
            .json(new errorResponse(404,`Email, Password or phone number format does'nt match`,true,null))

        }
        const hashPassword = await bcryptPassword(password)
       
        //opt generate
        const saveUserData = await userModal.create({
            //userModal item key : user value (destructuring value)
            firstName: firstName,
            address: address,
            email: email,
            phoneNumber: phoneNumber,
            password: hashPassword,
            ...(lastName && {lastName: lastName}),
        })
        const Otp = otpgenetor()
        //send email 
        const messageId = await sendMail(firstName,Otp,email)
        if (messageId) {
             //User values saved in database
            const updatedUserData = await userModal.findOneAndUpdate(
                {email: email},
                {
                    otp: Otp,
                    expireOtp: new Date().getTime() + 30 * 60 * 1000,
                },
                {new: true},
            )
        }
        return res
            .status(200)
            .json( new successResponse(200,"Registration successful",saveUserData,false))
        
    } catch (error) {
        //========New method ========
        return res
         .status(404)
         .json(new errorResponse(404,`Can't found: ${error}`,null,true,))
        //========Old method ========
        // res.status(404).json({
        //     statusCode: 404,
        //     message: `Can't found ${error}`,
        //     error: true,
        //     name: null,
        //     number: null,
        //     city: null,
        // })
    }
}

const login = async(req,res) => {
    try {
        const {emailOrphoneNumber,password} = req.body;
        if (!emailOrphoneNumber || !password) {
            return res
                .status(400)
                .json(new errorResponse(400,`Invalid email or password`,null,true,))
        }
        const checkUserisExist = await userModal.findOne({
            $or: [
                {email :emailOrphoneNumber},
                {phoneNumber : emailOrphoneNumber}
            ]
        })
        if (checkUserisExist) {
            const checkisPasswordCorrect = await bcryptComparePassword(password,checkUserisExist.password)
            if (!checkisPasswordCorrect) {
                return res
                .status(401)
                .json(new errorResponse(401,`Invalid email or password`,null,true,))
            }
        }
            const userTokenInfo = {_id: checkUserisExist.id, firstName : checkUserisExist.firstName, email: checkUserisExist.email, phoneNumber : checkUserisExist.phoneNumber}
            const token = await GenerateToken(userTokenInfo)
            // console.log(token);
            
            return res
            .status(200)
            .cookie("token",token)
            .json( new successResponse(200,"login successful hello world",{
                data:{
                    token:`bearer: ${token}`,
                    email: checkUserisExist.email,
                    firstName : checkUserisExist.firstName,
                }
                },
                false)
            )
    } catch (error) {
        return res
         .status(500)
         .json(new errorResponse(500,`Can't found: ${error}`,null,true,))
    }
}

// otp verification
const otpVarify = async(req,res) => {
    try {
        const {email, otp} = req.body
        if (!email || !otp) {
            return res
            .status(400)
            .json(new errorResponse(400,`Enter a valid email or otp`,null,true,))
        }
        const matchUserOtp = await userModal.findOne(
            {email: email},
        )
        if (matchUserOtp.expireOtp >= new Date().getTime() && matchUserOtp.otp == otp) {
            const removeOtps = await userModal.findOneAndUpdate( 
                {email},
                {
                    otp : null,
                    expireOtp : null,
                },
                {new: true},
            )
            if (removeOtps) {
                return res
                .status(200)
                .json( new successResponse(200,"OTP Verify successful",null,false))
            }
        }
        
        return res
        .status(200)
        .json(new errorResponse(200, `verifaication successfull` ,null,true,))
        
    } catch (error) {
        return res
        .status(500)
        .json(new errorResponse(500,`Invalid OTP`,null,true,))
    }
}

module.exports = {registrationControl,login, otpVarify}