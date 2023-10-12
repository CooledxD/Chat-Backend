import jwt from 'jsonwebtoken'

export const accessToken = (payload) => {
  return jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: '15m'
    }
  )
}