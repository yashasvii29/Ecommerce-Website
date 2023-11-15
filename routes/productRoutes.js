const express=require('express');
const Product=require('../models/Product');
// Product model ko isliye require kr rhe hai kyunki products show krne hai toh Product model ke andar se products  find krenge and then display on the page

// app method  applicaton ka complete instance hai ise export nhi kr sakte
// we cant write app.get and app.post here
// express provide mini instance (router) we will use router 
const router =express.Router()// mini instance
router.get('/products',async(req,res)=>{
    //1... Database m se data show krne ke liye pehle uss model(collection) ke anadr se data (products array) find krenge then data ko index page pr bhejenge
    // 2...Product ke model(collection ) ke andar se products find krenge(means database m se data find krenge) and find() mongoose ka method hai (means db ka crud method hai) and y methods promise return krte hai ....promise ki chaining se bachne ke liye we will use async await
    let products=await Product.find({});
    // find method jo bhi return krega use ek products variable m store kr lenge and uss variable ko render method m object ke andar pass kr denge
    res.render('products/index',{products});
    // index ki file products folder ke andar hai that's why products/index
    // render method m {} ke andar products variable pass kiya hai which means index.ejs file ke andar products data bhej rhe hai......jab user /products page pr req send krega toh response m index page show hoga and index page pr products(means y data bhej rhe hai)
    
})

module.exports=router;// router ko export kr rhe hai toh app.js file ke andar require krenge