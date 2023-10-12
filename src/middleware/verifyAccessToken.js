import Jwt from "jsonwebtoken"
import Joi from 'joi'

export const verifyAccessToken = (paths) => {
  return (req, res, next) => {
    try {
      if (paths.includes(req.originalUrl)) {
        return next()
      }

      const token = req.headers.authorization.split(' ').pop()

      Joi.assert(
        token,
        Joi.string().required()
      )

      const tokenData = Jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET
      )

      req.tokenData = tokenData

      next()
    } catch (error) {
      res.status(401).json({
        message: 'Access token not valid'
      })
    }
  }
}