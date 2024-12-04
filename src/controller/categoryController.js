const {successResponse} = require("../utilitis/infoResponse")
const {errorResponse} = require("../utilitis/infoErrorResponse");
const {categoryModal } = require("../modal/categorySchema")
const {fileUploadCloudinary} = require("../utilitis/cloudinary")

const categoryController = async(req,res) =>{
    try {
        const {name} = req.body;
        
        const filePath = req.files?.image[0]?.path
        const {secure_url} = await fileUploadCloudinary(filePath);
        
        const saveData = await new categoryModal({
            name: name,
            image: secure_url,
        }).save()

        if (saveData) {
            return res
            .status(200)
            .json( new successResponse(200,"Database created successfully",null,false))
        }

        return res
        .status(200)
        .json( new successResponse(200,"category successfull",null,false))
        
    } catch (error) {
        return res
        .status(200)
        .json(new errorResponse(200, `category unsuccessfull` ,null,true,))
    }
}

module.exports = { categoryController }