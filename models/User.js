// User.js file m Review.js file ka complete code copy kr lenge

const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose'); // its is a npm package so we will install this package and then require in User model
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        trim:true,
        required:true
    }
   })
User.plugin(passportLocalMongoose);
let User=mongoose.model('User',userSchema);
module.exports=User;