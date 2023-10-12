import { UserFindOne } from "../models.js"

export const getUserData = async (req, res) => {
  try {
    const { userId } = req.tokenData

    const userData = await UserFindOne(
      {
        id: userId
      }, 
      [
        'username',
        'avatarUrl'
      ]
    )

    res.status(200).json(userData)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}