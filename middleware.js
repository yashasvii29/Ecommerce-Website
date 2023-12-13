// schema ko validate krne ke liye middleware.js file banayi hai..iss file ke andar dono schema ko validate krenge
// schema validate hone ke baad hi new product ko add krenge, edit krenge
const {productSchema,reviewSchema,userSchema} =require('./schema');// productschema and reviewschema ko destructure krenge and schema.js file se require krenge dono schema ko
const validateProduct=(req,res,next)=>{
    let {name,img,price,desc}=req.body;
    const {err}=productSchema.validate({name,img,price,desc});  // schema(product ke schema) ko validate kr rhe hai...validate method return two things  err and value but hum only err ko destructure krte hai
    if(err){
        return res.render('error');
    }
    // if validate hone ke baad err nhi aayega toh next middleware chalega
    next();// next() means err nhi aaya and product validate ho chuka hai toh ab aage badh jao means validateProduct middleware ke baad jo callback function hai(/in productRoutes.js) use run kro jo routes m pass kiya hai(/products ke routes m)
    // next is a middleware if err nhi aayega then next middleware chalega means aage ka callback fun run hoga
};


const validateReview=(req,res,next)=>{
    const {rating,comment}=req.body;
    const {err}=reviewSchema.validate({rating,comment}); // review k eschema ko validate kr rhe hai
    if(err){
        return res.render('error');
    }
    // if validate hone ke baad err nhi aayega toh next middleware chalega
    next();// next() means err nhi aaya and review validate ho chuka hai toh ab aage badh jao means validateReview middleware ke baad jo callback function hai(in reviewRoutes.js file) use run kro jo routes m pass kiya hai(/products ke routes m)

}
// isLoggedIn middleware ko har route m pass krenge in productRoutes
const isLoggedIn =(req,res,next)=>{  // user authenticate hai ya nhi (loggedin hai ya nhi means login hai ya nhi) y check krne ke liye middleware ka use krenge we will use isAuthenticated method y method boolean value return krta hai if it returns true  means user loggedin hai authenticate hai ...and if it returns false means loggedin nhi hai
    if(!req.isAuthenticated()){
        req.flash('err','please login first');// if user login nhi hai toh y err show hoga and res m login bhej show hoga
        return res.redirect('/login');
    }
    next();// if user login hai toh y next() chalega means productRoutes m isLoggedIn middleware ke baad async function run hoga
};

const isSeller = (req,res,next)=>{
    if(!req.user.role){   // if user ka koi role nhi hai then he dont have access to do anything 
        req.flash('err','You dont have the permission to do that');
        return res.redirect('/products');
    }
    else if(req.user.role !== 'seller'){ // if user ka role hai but role seller nhi hai(means buyer hai means client) then he dont have access to do anything
        req.flash('err','You dont have the permission to do that');
        return res.redirect('/products');
    }
    next();
}
// suppose 2 seller hai toh 2nd seller 1st seller ke product ko delete nhi kr sakta toh iske liye we will make isProductAuthor middleware .....iss middleware ki help se we will find product ka author kon hai
const isProductAuthor = async(req,res,next)=>{
    let {id}=req.params; // isse product ki id mil jayegi
    let product=await Product.findById(id);// Product ke database m se uss product ko find krenge with the help of id
    // when we want to compare two object ids then we have method 'equals'....hum === se two object id ko compare nhi kr sakte
    if(!product.author.equals(req.user._id)){  // we will check req.user._id se jo id milegi wo uss product ke author ki id hai ya nhi
        req.flash('err','You are not a authorised user');
        return res.redirect('/products'); 
    }
    next();
}

const validateUser=(req,res,next)=>{  
    const {username,password,email,role}=req.body;
    const {error , value}=userSchema.validate({username,password,email,role}); // user k schema ko validate kr rhe hai

    // FOR SEEING THE OBJECTS RETURNED BY JOI
    console.log(value);
    console.log(error);
    if(error){
        return res.render('error' , {error : error.message});
    }
    // if validate hone ke baad err nhi aayega toh next middleware chalega
    next();

}
module.exports={validateProduct,validateReview,isLoggedIn,isSeller,isProductAuthor,validateUser};
// validateProduct,validateReview dono middleware export kr he hai....validateProduct ko productRoutes m require krenge and validateReview ko reviewRoutes m require krnge
