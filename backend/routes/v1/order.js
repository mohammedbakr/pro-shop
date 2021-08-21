import express from 'express'

import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid
} from '../../controllers/order.js'
import protect from '../../middleware/auth.js'

const router = express.Router()

router.post('/', protect, addOrderItems)

router.get('/my-orders', protect, getMyOrders)

router.get('/:id', protect, getOrderById)

router.put('/:id/pay', protect, updateOrderToPaid)

export default router
