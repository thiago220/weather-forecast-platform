import Joi from 'joi'

export const citySchema = Joi.object({
  city: Joi.string().required(),
})

export const coordsSchema = Joi.object({
  lat: Joi.string().required(),
  lon: Joi.string().required(),
})
