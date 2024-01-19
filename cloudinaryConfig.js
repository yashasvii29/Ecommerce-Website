const cloudinary = require("cloudinary").v2;
const fs =require('fs');
// const { CloudinaryStorage } = require("multer-storage-cloudinary");

// const dotenv =  require('dotenv').config();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
   
const uploadOnCloudinary = async(filePath)=>{
    try{
        if(!filePath)
            return null;
        // upload file on cloudinary
        const res = await CloudinaryStorage.uploader.upload(filePath,{
            resource_type:"auto"
        })
 
        // file has been uploaded successfull
        console.log("file is uploaded on cloudinary",res.url);
        fs.unlinkSync(filePath);
        return res;
    }
    catch(err){
        FileSystem.unlinkSync(filePath);
        // remove locally saved temporary file as the upload operation got failed
        return null; 
    }
}
