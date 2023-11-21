// Review.js file m Product.js file ka complete code copy kr lenge

const mongoose=require('mongoose');
const reviewSchema = new mongoose.Schema({
    rating:{
        type:Number,
        min:0,
        max:5
    },
    comment:{
        type:String,
        trim:true
    }
},{timestamps:true})
// when we want to work with time and date ...use the property timestamps(review kab diya hai timing kya thi date kya thi y show krne ke liye we will use the property timestamp)
// timestamps property return two values=> updatedAt and createdAt....we can see these values by running the command on the mongosh(db.reviews.find({}))....in values ko date ki form m and time ki form m convert krna hai so we'll use the method toDateString
// show.ejs page pr loop ke andar createdAt value ko find kiya hai and date ko string m convert kr diya hai by using the function(toDateString())
let Review=mongoose.model('Review',reviewSchema);
module.exports=Review;