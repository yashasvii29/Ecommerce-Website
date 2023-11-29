// schema ko validate krne ke liye middleware.js file banayi hai..iss file ke andar dono schema ko validate krenge
// schema validate hone ke baad hi new product ko add krenge, edit krenge
const {productSchema,reviewSchema} =require('./schema');// productschema and reviewschema ko destructure krenge and schema.js file se require krenge dono schema ko
const validateProduct=(req,res,next)=>{
    let {name,img,price,desc}=req.body;
    const {error}=productSchema.validate({name,img,price,desc});  // schema(product ke schema) ko validate kr rhe hai...validate method return two things  error and value but hum only error ko destructure krte hai
    if(error){
        return res.render('error');
    }
    // if validate hone ke baad error nhi aayega toh next middleware chalega
    next();// next() means error nhi aaya and product validate ho chuka hai toh ab aage badh jao means validateProduct middleware ke baad jo callback function hai(/in productRoutes.js) use run kro jo routes m pass kiya hai(/products ke routes m)

};

const validateReview=(req,res,next)=>{
    const {rating,comment}=req.body;
    const {error}=reviewSchema.validate({rating,comment}); // review k eschema ko validate kr rhe hai
    if(error){
        return res.render('error');
    }
    // if validate hone ke baad error nhi aayega toh next middleware chalega
    next();// next() means error nhi aaya and review validate ho chuka hai toh ab aage badh jao means validateReview middleware ke baad jo callback function hai(in reviewRoutes.js file) use run kro jo routes m pass kiya hai(/products ke routes m)

}
const isLoggedIn =(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error','please lgin first');
        returnres.redirect('/login');
    }
    next();
};


module.exports={validateProduct,validateReview,isLoggedIn};
// validateProduct,validateReview dono middleware export kr he hai....validateProduct ko productRoutes m require krenge and validateReview ko reviewRoutes m require krnge