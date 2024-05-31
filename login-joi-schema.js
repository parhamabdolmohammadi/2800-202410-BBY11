const Joi = require("joi");

/* Joi schema for login page
 * This joi schema for login page block of code was from code found here:
 * source: https://github.com/greencodecomments/COMP2537_Demo_Code_5/commit/05be996aa7bb50622db9d5e23e8dfa426fc9fc87
 * (from COMP2537 week 5 example code with variable names changed).
 */
const loginSchema = Joi.object(
    {
        email: Joi.string()
        .email({tlds: {allow: false}})
        .max(40)
        .required()
        .messages({
            'string.base': 'Email must be a string',
            'string.max': 'Email cannot be longer than 40 characters',
            'string.email': "Email must be a valid email",
            'string.domain': "Email must be a valid email",
            'string.empty': "Email is required"
        }),

        password: Joi.string()
        .max(20)
        .required()
        .messages({
            'string.base': 'Password must be a string',
            'string.max': 'Password cannot be longer than 40 characters',
            'string.empty': "Password is required"
        }),
    }
);

exports.loginSchema = loginSchema;
