import Joi from "joi";

export const contactSchema = Joi.object({
  name: Joi.string(),
  tel: Joi.string(),
  country: Joi.string(),
});


export const deleteContactSchema = Joi.object({
  id: Joi.number().integer(),
});
