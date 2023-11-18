const mongoose=require('mongoose');
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
let Product=mongoose.model('Product',productSchema);
module.exports=Product;