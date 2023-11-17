const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const seedDB=require('./seed');
const productRoutes=require('./routes/productRoutes');  // isliye require kr rhe hai jisse y har incoming req ke liye path check krega .....neeche app.use(productRoutes) kiya hai
const ejsMate=require('ejs-mate');// ejs mate is a templating engine which is used for layout
const methodOverride =require('method-override');// iski help se post req ko patch req m override kr denge
// method override ko require krne ke baad iska miidleware likhte hai _method
mongoose.connect('mongodb://127.0.0.1:27017/Shopping-app')
.then(()=>{
    console.log("DB Connected successfully")
})
.catch(()=>{
    console.log("DB error");
    console.log(err);
})


// ejs is a templating language
app.engine('ejs',ejsMate);// app ko batayenge ki ejs file ko ejsMate engine read kr rhe hai
app.set('view engine','ejs'); // express ke pass default engine present hai that is view engine and view engine ejs files ko dekh rha hai.....but hum default engine ke sath work nhi krna chahte so we'll install the engine => ejs mate(this is also a engine) hum ejs mate engine ka use krenge
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));  //body object ke data ko dekhne ke liye we will use the middleware
app.use(methodOverride('_method'));

// seeding database(means add data to the database)
// seedDB();
// but seedDB function ko ek baar run krne ke baad just comment krna padega otherwise y always data ko seed krta rehega means database m data add krta rahega

app.use(productRoutes);// so that har incoming request ke liye path check hoga

app.listen(8080,()=>{
    console.log("server connected at port 8080");
})