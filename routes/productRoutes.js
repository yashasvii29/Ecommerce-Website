const express=require('express');
const Product=require('../models/Product');
// Product model ko isliye require kr rhe hai kyunki products show krne hai toh Product model ke andar se products  find krenge and then display on the page

// app method  applicaton ka complete instance hai ise export nhi kr sakte
// we cant write app.get and app.post here
// express provide mini instance (router) we will use router 
const router =express.Router()// mini instance
// 1st route=> to show all the products
router.get('/products',async(req,res)=>{
    //1... Database m se data show krne ke liye pehle uss model(collection) ke anadr se data (products array) find krenge then data ko index page pr bhejenge
    // 2...Product ke model(collection ) ke andar se products find krenge(means database m se data find krenge) and find() mongoose ka method hai (means db ka crud method hai) and y methods promise return krte hai ....promise ki chaining se bachne ke liye we will use async await
    let products=await Product.find({});
    // find method jo bhi return krega use ek products variable m store kr lenge and uss variable ko render method m object ke andar pass kr denge
    res.render('products/index',{products});
    // index ki file products folder ke andar hai that's why products/index
    // render method m {} ke andar products variable pass kiya hai which means index.ejs file ke andar products data bhej rhe hai......jab user /products page pr req send krega toh response m index page show hoga and index page pr products(means y data bhej rhe hai)
})

// 2nd route=> to show the form for new product
router.get('/product/new',(req,res)=>{
    res.render('products/new')
    // response m new form show hoga
})
//3rd route=> to add the new product to database and then redirect to the /products page
 //add product button pr click krte hi post request jayegi /products pr jo humne form define kiya hai in action attribute
router.post('/products', async (req,res)=>{
    // jab form submit hoga toh sara data req ki body m milega ....toh unn sabhi data ko object ke andar destructure krenge
    let {name,img,price,desc}=req.body;  // body object ke data ko dekhne ke liye we will use the middleware app.use(express.urlencoded)
    // database ke andar new product ko add krenge...means Product model ke andar new product create krenge
    await Product.create({name,img,price,desc})//  create mongodb ka method hai and y promise return krta hai to promise ki chaining se bachne ke liye we will use async and await
    // database ke andar new product add hone ke baad /products page pr redirect krenge
    res.redirect('/products')// redirect means get req jayegi /products pr and sabhi products show ho jayenge with new product

})
// pehle se likha hua code show ho rha hai toh enter tab
// 4th route=> to show a particular product
router.get('/products/:id',async(req,res)=>{
    // id params object se milegi toh id ko object ke andar destructure krenge
    let {id} =req.params; // isse id mil jayegi
    // jo id hume mili hai use database ke andar find kenge means Product model ke andar find krenge
    let foundProduct= await Product.findById(id); // id find krne ke liye we'll use the method findById()
    res.render('products/show',{foundProduct});
})
// if kisi chij ko show krna hai then we'll always send get request

// 5th route=> show the form to edit the product(particular product)
router.get('/products/:id/edit',async(req,res)=>{
    let {id}=req.params;
    let foundProduct= await Product.findById(id);
    res.render('products/edit',{foundProduct});
})
// product m edit kr rhe hai(form ke andar edit kr he hai) means database ke andar changes kr rhe hai so we'll send patch req because edit means partial change (partial change ke liye we'll send patch req)
// but form ke andar patch req nhi hoti ...form can send only get or post req
// database m changes kr rhe hai toh post req ko override kr denge patch req m with the help of method override package
// install the package method override=> npm i method override  then require in the app.js file

// 6th route=> to edit the product in database(means Product model m)
// jab edit product button pr click krenge toh patch req jayegi iss url pr  /products/:id/edit
router.patch('/products/:id',async(req,res)=>{
    let {id} =req.params;
    let {name,img,price,desc}=req.body;
    await Product.findByIdAndUpdate(id,{name,img,price,desc});// Product model(database) ke andar se uss product ko find krenge jise edit kiya hai ById and update kr denge
    res.redirect(`/products/${id}`);// id ko evaluate krne ke liye backtick ka use kiya h ...product ko edit krne ke baad (means edit product button pr click krte hi usi particular product pr redirect kr jayenge jise edit kiya h isliye redirect method m uss product ki id di h)

})
// 7th route=> to delete a particular product(delete krne ke liye post req ko delete req m override krenge means method override krenge and req send krne ke liye hume form ki need hoti hai so we will make delete form in the indes.ejs file)
// database ke andar se product delete krna hai means post req jayegi but hum method override krenge...post req ko delete req m override kr denge and we will send delete request and product delete krne ke baad redirect krenge

router.delete('/products/:id',async(req,res)=>{
    let {id} =req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

module.exports=router;// router ko export kr rhe hai toh app.js file ke andar require krenge
