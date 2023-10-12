import { RefreshTokenRemove } from "../models.js"

export const logout = async (req, res) => {
  try {
    const { userId } = req.body

    await RefreshTokenRemove({userId})

    res.status(200).end()
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}