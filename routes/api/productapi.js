const express = require('express');
const router = express.Router();
let {isLoggedIn} = require('../../middleware')
const User = require('../../models/User');
//like button ke liye api create krenge
//api ka kaam hota hai to listen for the ajax request
// routes m pura page render karate hai means response m pura page bhejte hai which is not an api but in api we will send backs the data means api send backs the data
// so iss api ko app.js file m require krenge then use 
// ajax request ke liye we will copy the link from the github.com/axios and then paste in the boilerplate

router.post('/product/:id/like' , isLoggedIn , async(req,res)=>{ // product ko like krne ke liye user login hona chahihye toh jab user like button pr click krega toh sabse pehle isLoggedIn middleware chalega
    let {id} = req.params;
    let user = req.user;
    let isLiked = user.wishList.includes(id);

    // if(isLiked){
    //     User.findByIdAndUpdate(req.user._id , {$pull:{wishList:productId}})
    // }else{
    //     User.findByIdAndUpdate(req.user._id , {$addToSet:{wishList:productId}})
    // }

    const option = isLiked? '$pull' : '$addToSet';
    //the below code can be done by else if as well
    req.user = await User.findByIdAndUpdate(req.user._id , {[option]:{wishList:id}} , {new:true} )
    res.send('like done api');
})

// jab bhi hum apne project m koi new functionality add krte hai toh sabse pehle uss functionality ko apne schema m means model m add krte hai

module.exports = router;

