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

module.exports={productSchema,reviewSchema};