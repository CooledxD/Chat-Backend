import { MessageFindMany } from "../models.js"

export const getMessages = async (req, res) => {
  try {
    const { userId } = req.tokenData

    const messages = await MessageFindMany(userId)

    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}