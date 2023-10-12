import Joi from 'joi'
import bcrypt from 'bcrypt'

import { UserFindOne } from '../../models.js'

const schema = Joi.object({
  username: Joi.string()
    .alphanum()
    .pattern(/^[a-zA-Z]/)
    .min(3)
    .max(10)
    .required()
    .messages({
      '*': 'Incorrect data'
    }),

  password: Joi.string()
    .alphanum()
    .min(8)
    .max(30)
    .pattern(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/)
    .required()
    .messages({
      '*': 'Incorrect data'
    })
})

export const login = async (req, res, next) => {
  try {
    const { body } = req
    const { username, password } = req.body

    await schema.validateAsync(body)

    const userData = await UserFindOne(
      {
        username
      },
      [
        'id',
        'password'
      ]
    )

    if (!userData) {
      throw new Error('Incorrect data')
    }

    const isValidPass = await bcrypt.compare(
      password,
      userData.password
    )

    if (!isValidPass) {
      throw new Error('Incorrect data')
    }

    req.body.userData = userData

    next()
  } catch (error) {
    res.status(403).json({
      message: error.message
    })
  }
}