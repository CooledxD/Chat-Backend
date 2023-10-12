import bcrypt from 'bcrypt'

import { UserInsert } from '../models.js'

export const register = async (req, res) => {
  try {
    const { username, password } = req.body

    const hashPassword = await bcrypt.hash(password, 8)

    await UserInsert({
      username,
      password: hashPassword
    })

    res.status(201).end()
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create an account'
    })
  }
}