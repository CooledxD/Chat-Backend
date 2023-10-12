import Joi from 'joi'

import { RefreshTokenFindOne } from '../../../../models/models.js'

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body

    Joi.assert(
      refreshToken,
      Joi.string()
        .pattern(/[A-Za-z0-9_-]{21}/)
        .required()
        .messages({
          '*': 'Incorrect token'
        })
    )

    const dbToken = await RefreshTokenFindOne(refreshToken)

    if (!dbToken) {
      throw new Error('Incorrect token')
    }

    req.body.dbToken = dbToken 

    next()
  } catch (error) {
    res.status(401).json({
      message: error.message
    })
  }
}