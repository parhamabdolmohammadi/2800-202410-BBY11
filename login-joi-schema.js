const Joi = require("joi");

const schema = Joi.object(
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
            'string.empty': "Email is required",
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

exports.schema = schema;
