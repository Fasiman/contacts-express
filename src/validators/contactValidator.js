import Joi from "joi";

export const contactSchema = Joi.object({
  name: Joi.string().trim().min(1).required(),
  tel: Joi.string().trim().min(1).required(),
  country: Joi.string().trim().min(1).required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().trim().min(1),
  tel: Joi.string().trim().min(1),
  country: Joi.string().trim().min(1),
}).min(1);

export const deleteContactSchema = Joi.object({
  id: Joi.string().pattern(/^[0-9]+$/).required(),
});
