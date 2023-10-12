import express from "express"

// libraries
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import compression from "compression"
import cookieParser from "cookie-parser"

// database
import './models/models.js'

// routes
import authRoutes from './modules/auth/auth.js'
import userRoutes from './modules/user/user.js'

// middleware
import { 
  verifyAccessToken 
} from "./middleware/verifyAccessToken.js"

dotenv.config()

const app = express()

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
// app.use('/chat', ...)

app.listen(process.env.PORT, () => {
  console.log(`Server started on port: ${process.env.PORT}`)
})