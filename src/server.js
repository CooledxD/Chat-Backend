import express from "express"
import { createServer } from 'http'

// libraries
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import compression from "compression"
import cookieParser from "cookie-parser"

// database
import mysql from './models/models.js'

// routes
import authRoutes from './modules/auth/auth.js'
import userRoutes from './modules/user/user.js'
import chatRoutes from './modules/chat/chat.js'

// middleware
import { 
  verifyAccessToken 
} from "./middleware/verifyAccessToken.js"

// socket
import { socket } from "./modules/chat/chat.js"

dotenv.config()

const app = express()
const httpServer = createServer(app)
socket(httpServer)

app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL.split(', ')
}))
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginEmbedderPolicy: { policy: "credentialless" }
}))
app.use(cookieParser())
app.use(express.json())
app.use(compression())
app.use('/', verifyAccessToken(
  [
    '/auth/login', 
    '/auth/register',
    '/auth/refresh',
  ]
))
app.disable('x-powered-by')

app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/chat', chatRoutes)

httpServer.listen(process.env.PORT, () => {
  mysql.connect((err) => {
    err ?
    console.error(`Error: ${err.message}`) :
    console.log('DB is connected')
  })

  console.log(`Server started on port: ${process.env.PORT}`)
})