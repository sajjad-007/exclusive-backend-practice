const {successResponse} = require("../utilitis/infoResponse")
const {errorResponse} = require("../utilitis/infoErrorResponse");
const { emailChecker, passwordChecker, numberChecker } = require("../utilitis/regex");
const {userModal} = require("../modal/modalSchema")
const {sendMail} = require("../helper/nodemailer")
const { otpgenetor } = require("../helper/otpGenetor")
const {bcryptPassword,bcryptComparePassword} = require("../helper/bcrypt")

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
        console.log(hashPassword);
        
        const saveUserData = await userModal.create({
            //userModal item key : user value (destructuring value)
            firstName: firstName,
            address: address,
            email: email,
            phoneNumber: phoneNumber,
            password: hashPassword,
            ...(lastName && {lastName: lastName}),
        })
        //opt generate
        const Otp = otpgenetor()
        //send email 
        const messageId = await sendMail(firstName,Otp,email)
        if (messageId) {
            const updatedUserData = await userModal.findOneAndUpdate(
                {email: email},
                {otp: Otp},
                {new: true},
            )
            // console.log(updatedUserData);
        }
        return res.status(200).json( new successResponse(200,"Registration successful",saveUserData,false))
        
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
        if(!emailChecker(emailOrphoneNumber) || !passwordChecker(password)){
            
            return res
            .status(404)
            .json(new errorResponse(404,`Email, Password or phone number format does'nt match`,true,null))

        }
        const checkUserEmailphoneNumber = await userModal.findOne({
            $or: [
                {email :emailOrphoneNumber},
                {phoneNumber : emailOrphoneNumber}
            ]
        })
        
        if (checkUserEmailphoneNumber) {
            const checkisPasswordCorrect = await bcryptComparePassword(password,checkUserEmailphoneNumber.password)
            if (!checkisPasswordCorrect) {
                return res
                .status(401)
                .json(new errorResponse(401,`Invalid email or password`,null,true,))
            }else{
                return res
                .status(200)
                .json( new successResponse(200,"login successful",null,false))
            }
        }else{
            return res
            .status(500)
            .json(new errorResponse(500,`Invalid email or password`,null,true,))
        }
        

        
    } catch (error) {
        return res
         .status(500)
         .json(new errorResponse(500,`Can't found: ${error}`,null,true,))
    }
}

module.exports = {registrationControl, login}