import { Server } from 'socket.io'
import Jwt from "jsonwebtoken"
import Joi from 'joi'

import { MessageInsert } from '../../../models/models.js'

export default function (server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL.split(', ')
    }
  })

  io.use((socket, next) => {
    try {
      const { token } = socket.handshake.auth

      Joi.assert(
        token,
        Joi.string().required()
      )

      const tokenData = Jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET
      )

      socket.token = tokenData
      socket.userId = tokenData.userId

      next()
    } catch (error) {
      return next(new Error('Access token not valid'))
    }
  })

  io.on('connection', (socket) => {
    socket.on('userMessage', async (message) => {
      const { userId } = socket.token

      await MessageInsert({
        creator_id: userId,
        text: message.text,
        recipient_id: message.chatId
      })
    })

    // console.log(io.of('/').sockets.get(`${socket.id}`).userId)

    socket.on('disconnect', () => {
      
    })
  })

  return io
}