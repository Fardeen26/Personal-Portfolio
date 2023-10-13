const Joi = require('joi');

module.exports.joiuserSchema = Joi.object({

    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'dev', 'edu'] } }),
    message: Joi.string(),
});
