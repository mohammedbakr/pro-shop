import express from 'express'

import { getAuth, login } from '../../controllers/auth.js'
import protect from '../../middleware/auth.js'

const router = express.Router()

router.get('/', protect, getAuth)

router.post('/login', login)

export default router
