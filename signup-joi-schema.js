const Joi = require("joi");

/* Joi schema for signup page
 * This joi schema for login page block of code was adapted from code found here:
 * source: https://github.com/greencodecomments/COMP2537_Demo_Code_5/commit/05be996aa7bb50622db9d5e23e8dfa426fc9fc87
 * (from COMP2537 week 5 example code with variable names changed).
 */
const signupSchema = Joi.object({
    username: Joi.string()
        .pattern(/^[a-zA-Z0-9 ]*$/)
        .min(5)
        .max(40)
        .required()
        .messages({
            'string.base': 'Username must be a string',
            'string.pattern.base': 'Username can only contain letters, numbers, and spaces',
            'string.min': 'Username must be at least 5 characters long',
            'string.max': 'Username cannot be longer than 40 characters',
            'string.empty': 'Username is required'
        }),

    email: Joi.string()
        .email({ tlds: { allow: false } })
        .max(40)
        .required()
        .messages({
            'string.base': 'Email must be a string',
            'string.max': 'Email cannot be longer than 40 characters',
            'string.email': 'Email must be a valid email',
            'string.domain': 'Email must be a valid email',
            'string.empty': 'Email is required',
        }),

    password: Joi.string()
        .min(5)
        .max(20)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{5,}$'))
        .required()
        .messages({
            'string.base': 'Password must be a string',
            'string.min': 'Password must be at least 5 characters long',
            'string.max': 'Password cannot be longer than 20 characters',
            'string.pattern.base': 'Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character',
            'string.empty': 'Password is required'
        }),
});

exports.signupSchema = signupSchema;
