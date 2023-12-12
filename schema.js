// schema for your server side validation
// copy code from joi documentation
const Joi = require('joi');
// joi ke liye schema likhenge
// product ka schema 
const productSchema = Joi.object({
    name: Joi.string().required(),
    img: Joi.string().required(),
    price: Joi.string().min(0).required(),
    desc: Joi.string().required()

});
// review ka schema
const reviewSchema = Joi.object({
    rating: Joi.string().min(0).max(5).required(),
    Comment: Joi.string().required()

});

const userSchema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        email: Joi.string()               
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        role:Joi.string().required()
});

module.exports={productSchema,reviewSchema,userSchema};