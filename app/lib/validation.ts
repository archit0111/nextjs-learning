import Joi from "joi";

export const signupSchema = Joi.object({
    name:Joi.string().min(2).max(30).required().messages({
        "string.min": "Name must be at least 2 characters long",
        "any.required": "Name is a required field"
    }),
    email:Joi.string().email({minDomainSegments:2}).required().messages({
        "string.email": "Please enter a valid email address",
        "any.required": "Email is required"
    }),
    password:Joi.string().min(4).required().messages({
        "string.min": "Password must be at least 4 characters long",
        "any.required": "Password is required"
    })
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Invalid email format",
        "any.required": "Email is required"
    }),
    password: Joi.string().required().messages({
        "any.required": "Password is required"
    })
});