
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
// require('dotenv').config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadImageOnCloudinary = async(filePath,folderName) =>{
  try{
    // uploading image on cloudinary from server
    const result = await cloudinary.uploader.upload(filePath,{
      folder:folderName
    });

    // delete image from server
    try{
      fs.unlinkSync(filePath);

    }
    catch(err){
      console.log("failed to delete image from the server",err);
    }
    // isse image cloudinary pr uplaod ho jayegi inside a folder and uske baad apne server(means public ke andar images folder m bhi image ke path ko save kr rhe h toh wo bhi delete kr denge after uploading the image on cloudinary) se delete kara denge otherwise server pr space jayda legi
    // image ko delete krne ke liye fs module ka use krenge
    console.log(result); // cloudinary pr image uplaod krne ke baad jo cheeze milti hai wo result m aa jayengi
    return {
      secure_url:result.secure_url,
      public_id:result.public_id

    };

  }
  catch (error) {
    console.log("Cloudinary upload error:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }

  finally{
    console.log("Image uploaded to Cloudinary successfully");
  }
}
module.exports = uploadImageOnCloudinary;

// pehle image public /images folder ke andar aayegi then cloudinary pr uplaod hogi and after that hamare server means images folder se delete ho jayegi and it will also display on the ui