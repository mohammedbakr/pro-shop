import express from 'express'

import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid
} from '../../controllers/order.js'
import protect from '../../middleware/auth.js'
import isAdmin from '../../middleware/isAdmin.js'

const router = express.Router()

router.get('/', protect, isAdmin, getOrders)

router.post('/', protect, addOrderItems)

router.get('/my-orders', protect, getMyOrders)

router.get('/:id', protect, getOrderById)

router.put('/:id/pay', protect, updateOrderToPaid)

router.put('/:id/deliver', protect, isAdmin, updateOrderToDelivered)

export default router
