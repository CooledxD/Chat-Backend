import { nanoid } from 'nanoid/async';

import { RefreshTokenInsert } from '../models.js';
import { accessToken } from '../utils/accessToken.js';

export const login = async (req, res) => {
  try {
    const { userData } = req.body
    const refreshToken = await nanoid()

    await RefreshTokenInsert({
      refreshToken, 
      userId: userData.id
    })

    res.status(200).json({
      accessToken: accessToken({userId: userData.id}),
      refreshToken
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}