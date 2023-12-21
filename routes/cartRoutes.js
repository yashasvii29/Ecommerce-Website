const express=require('express');
const router=express.Router();//mini instance
const {isLoggedIn}=require('../middleware');
const User=require('../models/User');
const Product=require('../models/Product');

// route to see the cart
// jab user /user/cart pr req krega toh res m cart bhej show hoga and cart.ejs page pr currentuser ka data bhej rhe hai(data means wo user and uski cart bhej rhe hai)
router.get('/user/cart',isLoggedIn,async(req,res)=>{
    let user=await User.findById(req.user._id).populate('cart'); // jab bhi mongodb ke sath means database ke sath kaam krte hai so we will use populate method.....User ke database m se user ko find krenge with the help of id and user variable m uss user ke cart bhi aa jayenge(means uss user ne apne cart m konse products add kiye hai)
    const totalAmount = user.cart.reduce((sum , curr)=> sum+curr.price , 0)
    const productInfo = user.cart.map((p)=>p.desc).join(',');
    res.render('cart/cart',{user,totalAmount,productInfo});  

})

// actually adding the product to the cart
// ja user add to cart button pr click krega toh y route hit hoga
// jab user product ko cart m add krega means add to cart button pr click krega toh user ke cart m wo product add ho jayega...user ke cart m product ki id aa jayegi(means cart array m uss product ki id store ho jayegi)
// User ke database m changes kr rhe hai mneans user ke cart m product ko add kr he hai...user ki cart array m product ki id ko store kr rhe hai that's why post req jayegi
router.post('/user/:productId/add',isLoggedIn,async(req,res)=>{
    let {productId}=req.params;
    let userId =req.user._id;
    let product = await Product.findById(productId);
    let user = await User.findById(userId);
    user.cart.push(product);
    await user.save();
    res.redirect('/user/cart');
})
module.exports=router;


// cart user ki hoti hai(buyer ki hoti hai)..add to cart means user product ko cart m add kr lega
// cart ke andar product ki ids store hongi