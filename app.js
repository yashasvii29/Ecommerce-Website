const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const seedDB=require('./seed');
const ejsMate=require('ejs-mate');// ejs mate is a templating engine which is used for layout
const methodOverride =require('method-override');// iski help se post req ko patch req m override kr denge
// method override ko require krne ke baad iska miidleware likhte hai _method
const cookieParser=require('cookie-parser');
const flash=require('connect-flash'); // flash means display krna
const session=require('express-session');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('../models/User');
const productRoutes=require('./routes/productRoutes');  // isliye require kr rhe hai jisse y har incoming req ke liye path check krega .....neeche app.use(productRoutes) kiya hai
const reviewRoutes=require('./routes/reviewRoutes');
const authRoutes=require('./routes/authRoutes');
// cookie-parser npm ka package so we will install first and after that we will require
mongoose.connect('mongodb://127.0.0.1:27017/Shopping-app')
.then(()=>{
    console.log("DB Connected successfully")
})
.catch(()=>{
    console.log("DB error");
    console.log(err);
})
let configSession={ // y express-session ka middleware hai ise documentaion se copy krenge ...yahan pr dirct object ka use kiya hai
    secret: 'keyboard cat',// secret key ki kuch bhi value ho sakti hai like secret:yashasvi
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true } // secure:true ka use https protocol ke liye krte hai means deploy ke time pr iska use krte hai....https is a secure protocol
  };

// ejs is a templating language
app.engine('ejs',ejsMate);// app ko batayenge ki ejs file ko ejsMate engine read kr rhe hai
app.set('view engine','ejs'); // express ke pass default engine present hai that is view engine and view engine ejs files ko dekh rha hai.....but hum default engine ke sath work nhi krna chahte so we'll install the engine => ejs mate(this is also a engine) hum ejs mate engine ka use krenge
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));  //body object ke data ko dekhne ke liye we will use the middleware
app.use(methodOverride('_method'));
app.use(session(configSession)); // session ke middleware ka use kiya hai
app.use(flash());// flash ke middleware ka use krenge (flash package)
// flash means display krna(flash a message means display a message/popup a message)
// req.flash() means flash message ko routes m add krenge jin routes pr req send krne pr message ko flash krana hai then neeche jo middleware use kiya hai vo krenge for flash a success message and error message for all the templates
// passport ki cheezon ko app.js file m use krne ke liye passport ko initialise krna padega
app.use(passport.initialize());
app.use(passport.session()); //locally store krne ke liye session ka use krte h
app.use((req,res,next)=>{
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    next();
// hume message ko har page pr means har template pr flash/popup/display krana hai ...if kisi kaam ko again and again krna hai means pehle edit page pr message ko flash karana hai then show page pr then new page pr then we will use locals(means hum cheezon ko local storage m store krte hai)...locals is a part of js
// locals is a object which contain local variables and locals is available in response(res m locals object available hota hai) and they are available for the views rendered
})
// passport
passport.use(new LocalStrategy(  // passport-local ka middleware use krenge from documentation 
  
  ));
// seeding database(means add data to the database)
//  seedDB();
// but seedDB function ko ek baar run krne ke baad just comment krna padega otherwise y always data ko seed krta rehega means database m data add krta rahega

app.use(productRoutes);// so that har incoming request ke liye path check hoga
app.use(reviewRoutes); // so that har incoming request ke liye path check hoga
app.use(authRoutes); // so that har incoming request ke liye path check hoga
app.listen(8080,()=>{
    console.log("server connected at port 8080");
})


// req means client and res means server 