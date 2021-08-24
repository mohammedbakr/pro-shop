import express from 'express'

import {
  deleteUser,
  getUserById,
  getUsers,
  updateUser
} from '../../controllers/user.js'
import protect from '../../middleware/auth.js'
import isAdmin from '../../middleware/isAdmin.js'

const router = express.Router()

router.get('/', protect, isAdmin, getUsers)

router.get('/:id', protect, isAdmin, getUserById)

router.put('/:id', protect, isAdmin, updateUser)

router.delete('/:id', protect, isAdmin, deleteUser)

export default router
