const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const seedDB=require('./seed');

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




app.listen(8080,()=>{
    console.log("server connected at port 8080");
})