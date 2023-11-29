// auth.js file m reviewRoutes.js file ka complete code copy kr lenge

const express=require('express');
const User = require('../models/User');
const passport=require('passport');
const router =express.Router()// mini instance
// har router m try catch ka use krenge to handle the error

//1st route= to show the signup form 
router.get('/register',(req,res)=>{
    res.render('auth/signup');// jab user /register url pr req send krenga toh res m signup page render hoga show hoga
})

// 2nd route= want to register a user in my DB means user ko database m register krna chahte hai (user ko database m add krna chahte hai)
// jab user signup form fill krne ke baad signup button pr click krega toh post req jayegi and sara data body object m aa jayega
router.post('/register',async(req,res)=>{
    let {email,password,username}=req.body;// body object se form ke data ko destructure kr lenge
    const user= new User({email,username}); // new User create krenge(but new user ko create krte time password nhi bhejenge)
    const newUser = await User.register(user,password); // newuser ko database m register kr denge(means users ke collections(User ke model ) m users ke db m add kr denge) by using register method(to check user db m register hua hai ya nhi run the commnad on mongoshell=> db.users.find({}))...register method m 3 parameters pass krte hai register(user,password,cb) but callback function optional hota hai
    // User model means user ke database pr register method apply kiya hai so we will use async await
    // res.send(newUser);// res m newuser ka data bhej rhe hai
    res.redirect('/login');// signup button pr click krne ke baad login page pr redirect ho jayenge
})

// 3rd route= to show the login form
router.get('/login',(req,res)=>{
    res.render('auth/login');// jab user /login url pr req send krenga toh res m login page render hoga show hoga
})

// 4th route= login with the help of db
// passport ke andar authenticate method hota hai login m authenticate krte h.....authentication krne ke liye(means login krne ke liye) we will use authenticate method(passport documentation m middleware m)

router.post('/login',
    passport.authenticate('local', { // copy authenticate method from documentation ...passport ke method ko use kr rhe hai for authentication so passport ko require krenge in authRoutes
        failureRedirect: '/login',
        failureMessage: true }),
    (req,res)=>{
        console.log(req.user);// req ke andar user ka object hota hai 
    req.flash('success','You have successfully login');
    res.redirect('/products');// login krne ke baad products page pr redirect ho jayenge
// jab login button pr click krenge toh products page pr redirect ho jayenge
})

// 5th route= logout
// logout ke liye logout method ka use krenge..y method passport ke andar hai
router.get('/logout',(req,res)=>{
    ()=>{
        req.logout();
        req.flash('success','You have successfully logout');
        res.redirect('/login');//logout krne ke baad login page pr redirect ho aa jyenge
    }
})
module.exports=router;// router ko export kr rhe hai toh app.js file ke andar require krenge


// forgot password ke liye there is a npm package nodemailer