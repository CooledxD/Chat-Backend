import { Router } from "express";
import multer from "multer";

// controllers
import {
  getUserData,
  updateAvatar
} from './controllers/controllers.js'

const upload = multer()
const router = new Router()

router.get('/',
  getUserData
)

router.post('/avatar',
  upload.single('avatar'),
  updateAvatar
)

export default router