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
})
let Review=mongoose.model('Review',reviewSchema);
module.exports=Review;