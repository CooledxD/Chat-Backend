import Joi from "joi";

import { UserFindOne } from "../../models.js";

const schema = Joi.object({
  username: Joi.string()
    .alphanum()
    .pattern(/^[a-zA-Z]/)
    .min(3)
    .max(10)
    .required()
    .messages({
      'string.pattern.base': 'username must not start with digits'
    }),

  password: Joi.string()
    .alphanum()
    .min(8)
    .max(30)
    .pattern(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/)
    .required()
    .messages({
      'string.pattern.base': 'password must contain uppercase and lowercase letters, as well as numbers'
    }),

  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'passwords don\'t match'
    })
})

export const register = async (req, res, next) => {
  try {
    const { body } = req
    const { username } = req.body

    await schema.validateAsync(body, {
      errors: {
        wrap: {
          label: false
        }
      }
    })

    const isUsedLogin = await UserFindOne(
      {
        username
      }, 
      [
        'username'
      ]
    )

    if (isUsedLogin) {
      throw new Error('This login is already in use')
    }

    next()
  } catch (error) {
    res.status(403).json({
      message: error.message
    })
  }
}