import { nanoid } from 'nanoid/async'

import { accessToken } from '../utils/accessToken.js'
import { RefreshTokenUpdate } from "../models.js"

export const refresh = async (req, res) => {
  try {
    const { dbToken } = req.body

    const newRefreshToken = await nanoid()

    await RefreshTokenUpdate({ 
      newRefreshToken, 
      refreshTokenId: dbToken.id
    })

    res.status(200).json({
      accessToken: accessToken({userId: dbToken.userId}),
      refreshToken: newRefreshToken
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}