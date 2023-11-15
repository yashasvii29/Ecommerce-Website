const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const seedDB=require('./seed');
const productRoutes=require('./routes/productRoutes');

mongoose.connect('mongodb://127.0.0.1:27017/Shopping-app')
.then(()=>{
    console.log("DB Connected successfully")
})
.catch(()=>{
    console.log("DB error");
    console.log(err);
})



app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));

// seeding database(means add data to the database)
// seedDB();
// but seedDB function ko ek baar run krne ke baad just comment krna padega otherwise y always data ko seed krta rehega means database m data add krta rahega

app.use(productRoutes);// so that har incoming request ke liye path check hoga

app.listen(8080,()=>{
    console.log("server connected at port 8080");
})