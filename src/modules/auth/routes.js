import { Router } from "express";

// controllers
import {
  register,
  login,
  refresh,
  logout
} from './controllers/controllers.js'

// middleware
import { 
  register as validationRegister,
  login as validationLogin,
  refresh as validationRefresh,
  logout as validationLogout
} from './middleware/validations/validations.js'

const router = new Router()

router.post('/register', 
  validationRegister, 
  register
)

router.post('/login', 
  validationLogin,
  login
)

router.post('/refresh', 
  validationRefresh,
  refresh
)

router.post('/logout', 
  validationLogout,
  logout
)

export default router