import Joi from 'joi'

export const logout = async (req, res, next) => {
  try {
    const { userId } = req.body

    Joi.assert(
      userId,
      Joi.string().required()
    )

    next()
  } catch (error) {
    res.status(403).json({
      message: error.message
    })
  }
}