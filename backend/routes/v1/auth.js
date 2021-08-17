import express from 'express'

import {
  register,
  login,
  getAuthProfile,
  updateProfile
} from '../../controllers/auth.js'
import protect from '../../middleware/auth.js'

const router = express.Router()

router.post('/register', register)

router.post('/login', login)

router.put('/profile', protect, getAuthProfile)

router.put('/profile/update-profile', protect, updateProfile)

export default router
