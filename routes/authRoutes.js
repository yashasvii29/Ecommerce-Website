// auth.js file m reviewRoutes.js file ka complete code copy kr lenge

const express=require('express');
const router =express.Router()// mini instance
// har router m try catch ka use krenge to handle the error


module.exports=router;// router ko export kr rhe hai toh app.js file ke andar require krenge


// Passport is a tool ot technique which is used for hashing(to store the password)
// It has only one limitation passport is authentication middleware for Node.js 
// Passportjs.org (documentation)
// jab kisi app ya website pr login krte hai toh vahan pr facebook login,google login , github login bhi hote hai these are called OAuths
// passport strategy ke liye we will use passport-local package
// hashing ke liye we will use passpsort-local-mongoose package so we will install this package and then require in the user model.....hume password ko directly store nhi krna chahiye(otherwise data hack ho jayega) isliye hum password ko directly store nhi krte...password ko pehle hashed krenge and then store krenge....hashing m different algorithms hoti hai jinka use krte hai to store the password
// passport-local-mongoose package automatically 2 field store krke deta hai username and password for hashing...  jab  hum user ka schema define krenge toh usme 2 field nhi daalenge username and password beacuse plm automatically y 2 field Database m store kr dega (add kr dega)
// hash ke sath ek salt bhi hota hai salt new value generate krta hai
// hashing m hum pehle email ya username check krte hai if it matches in the users database then we check whether the input password is correct or not ....if password match nhi krta then it shows your password is incorrect and if input username ya input email login ke time pr match nhi krta then it also shows the password is incorrect  
// 