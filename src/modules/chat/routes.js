import { Router } from "express";

import {
  getChats,
  getMessages
} from './controllers/controllers.js'

const router = new Router()

router.get('/',
  getChats
)

router.get('/messages',
  getMessages
)

export default router