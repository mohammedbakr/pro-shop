import asyncHandler from 'express-async-handler'

import Order from '../models/order.js'
import ErrorResponse from '../utils/errorResponse.js'

const addOrderItems = asyncHandler(async (req, res, next) => {
  const { orderItems } = req.body

  if (orderItems && orderItems.length === 0)
    return next(new ErrorResponse('No order items', 400))

  req.body.user = req.user._id

  const order = await Order.create(req.body)

  res.status(201).json({ success: true, data: order })
})

export { addOrderItems }
