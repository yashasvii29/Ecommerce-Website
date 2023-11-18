// reviewRoutes.js file m ProductRoutes.js file ka complete code copy kr lenge

const express=require('express');
const Product=require('../models/Product');
const Review = require('../models/Review');
// Product model ko isliye require kr rhe hai kyunki products show krne hai toh Product model ke andar se products  find krenge and then display on the page

// app method  applicaton ka complete instance hai ise export nhi kr sakte
// we cannott write app.get and app.post here
// express provide mini instance (router) we will use router 
const router =express.Router()// mini instance

router.post('/products/:id/review',async(req,res)=>{
    // console.log(req.body);
    let {id}=req.params;
    let {rating,comment}=req.body;
    const product= await Product.findById(id);// product find krenge with the help of id(database ke andar se product find krenge with the help of id jise review dena hai)
    console.log(product);
    // new review banayenge means Review model ka object banayenge(because model is a js class)
    const review = new Review({rating,comment});
    // res.send('review route');
    // humne id ki help se jo product find kiya hai uss product ki reviews array m new review ko add kr denge(reviews array m new review ko push kr denge)
    product.reviews.push(review);
    // jis product ke andar reviews daale hai uss product ko save krenge and new review ko bhi save krenge
    await review.save();// save mongodb ka method hai it returns a promise and promise ki chaining se bachne ke liye we will use async and await
    await product.save();// save method is used to save (add) the document to the database
    res.redirect(`/products/${id}`);
    res.send('reviews stored successfully');
    // hum chahte hai page pr redirect krne ke baad uss page pr reviews show ho jo humne uss product ko diye hai...... Product ke model(database) se reviews show krne hai means dusri collection se render krna hai so we will use populate(populate means show krna)...reviews array ke andar jo objectid hai usse data populate krenge
    // hum chahte hai jab hum ek particular product ko dekhe toh uss product ke corresponding(side se) sare reviews(uss particular product ke sabhi reviews) show ho jaye(populate ho jaye)..means jab ek particular product ko show krenge toh uss product ke sath sabhi reviews bhi show kr denge(it is known as populate) toh productRoutes.js file m show product ka jo route likha tha usme Product.findById().populate('reviews') populate method add kr denge and parenthesis m reviews array ka name pass kiya hai
    // jab ek collection se dusre collection ka data chahiye so we will use populate(means hum reviews ke collection pr kaam kr rhe hai but hume products ke collection se data chahiye in that case we will use populate)
    // jo review humne diya hai use dekh sakte hai in mongosh (run the command=> db.reviews.find({})) and y dekhne ke liye ki konse product ko review diya hai then run the command in mongosh(db.products.find({}))
    
})

module.exports=router;// router ko export kr rhe hai toh app.js file ke andar require krenge
