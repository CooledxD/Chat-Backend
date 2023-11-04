import { ChatFindMany } from "../models.js"

export const getChats = async (req, res) => {
  try {
    const { userId } = req.tokenData

    const chats = await ChatFindMany(userId)

    res.status(200).json(chats)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}