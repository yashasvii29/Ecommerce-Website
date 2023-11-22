const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
app.get('/',(req,res)=>{
    res.send("cookies");
})
// cookies bhejna
app.get('/setcookies',(req,res)=>{
    res.cookie('mode','dark');
    res.cookie('name','kacha badam');
    res.cookie('location','gla');
    res.send('cookies set ho gyi');
    
})
// access all the cookies
app.get('/allcookies',(req,res)=>{
    console.log(req.cookies);
    res.send(req.cookies);
})
app.listen('5050',()=>{
    console.log("cookies running at port 5050 ")
})
// two types ke protocol hote h..http and https
// https means secure protocol


