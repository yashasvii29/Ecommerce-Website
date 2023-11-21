const mongoose=require('mongoose');
const Review = require('./Review');
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    } ,
    img:{
        type:String,
        trim:true
    } ,
    price: {
        type:Number,
        min:0,
        required:true
    },
    desc: {
        type:String,
        trim:true
    },
    // reviews array banayenge of objects(because ek product pr multiple reviews ho skte hai means bahut sare users ne ek hi product pr reviews diye hai)...it is a 1 to many relationship
    // array ke andar aisi property apply krenge jisse hum ek review ko dusre review se differentiate kr sake ...property is objectId(_id)
    // 1 to many relationship ke case m complete data store nhi krte...only objectId(_id) store krte hai
    // har element ki unique object id hoti hai(means _id)
    // reviews array m objectId store krenge(review ki object id) 
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'// ref m y batate hai objectId(_id) kis model se leni hai...Review ke Model se leni h
        }
    ]
})

// middleware jo behind the scences mongodb operations karwane pr use hota hai and iske andar pre and post middleware hote hai which are basically used over the schema and before the model

productSchema.post('findOneAndDelete',async function(product){ // y callback function iss product pr chal rha hai jise parameter m pass kiya hai
    //  findOneAndDelete middleware y callback function run krega jiske parameter m product pass kiya hai and mongodb ka method(findByIdAndDelete() method m id pass ki hai jo iss callback function m as a argument pass hogi)
    if(product.reviews.length>0){
       await Review.deleteMany({_id:{$in:product.reviews}})// reviews ke array m har id ko check krenge and id match hone pr uss review ko delete kr denge from reviews Collection(means reviews ke model m se database se)
    }
    // As a developer hum production m isi tarah se delete krte hai
    // post middleware ka use isliye kr rhe hai beacuse we want jab hum product ko delete kre toh uske reviews bhi delete jo jaye(reviews collection se bhi means database se bhi delete ho jaye).... y check krne ke liye uss product ke reviews reviews ke collection(means reviews ke database) se delete hue hai ya nhi run the command on the mongosh => db.reviews.find({})
})
let Product=mongoose.model('Product',productSchema);
module.exports=Product;