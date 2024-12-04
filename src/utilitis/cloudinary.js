const cloudinary = require("cloudinary")
const fs = require("fs")
// Configuration
cloudinary.config({ 
    cloud_name: "dyfxtlv1x", 
    api_key: "717948855457723", 
    api_secret: "9JMjwcrY7LWzt3o2aQTQjs3zoK4" // Click 'View API Keys' above to copy your API secret
});
const fileUploadCloudinary = async(filePath) => {
    try {
        
        // Upload an image
        const uploadResult = await cloudinary.uploader.upload(filePath)
        if (uploadResult) {
            fs.unlinkSync(filePath)
        }
        return uploadResult
    } catch (error) {
        console.log("Cloudinary file upload error: ", error);
           
    }
 
}

module.exports = {fileUploadCloudinary}