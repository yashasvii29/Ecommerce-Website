const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("cloudinaryConfig");

// file storage
const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null,'./uploads');
    },
    filename: function (req,file,cb){
        // const uniqueSuffix  = Date.now() + '-' + Math.round(Math.random()*1E9)
        cb(null,file.originalname)
    }
})

// file validation

// const filterFilter  = (req,file,cb) =>{
//     if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
//         cb(null,true);
//     }
//     else{
//         cb({message:'Unsupported File format'},false);
//     }
// }

const upload = multer({
    storage: storage,
    // limits:{fileSize:1024*1024},
    // fileFilter:filterFilter
})


module.exports = upload;