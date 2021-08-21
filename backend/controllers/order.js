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

const getOrderById = asyncHandler(async (req, res, next) => {
  const id = req.params.id

  const order = await Order.findById(id).populate({
    path: 'user',
    select: 'name email'
  })
  if (!order)
    return next(new ErrorResponse(`Order not found with id ${id}`, 404))

  if (order.user._id.toString() !== req.user._id.toString())
    return next(
      new ErrorResponse(
        `You are not authorized to view the order with id ${id}`
      )
    )

  res.status(200).json({ success: true, data: order })
})

const updateOrderToPaid = asyncHandler(async (req, res, next) => {
  const orderId = req.params.id
  const {
    id,
    status,
    update_time,
    payer: { email_address }
  } = req.body

  const order = await Order.findById(orderId)
  if (!order)
    return next(new ErrorResponse(`Order not found with id ${orderId}`, 404))

  if (order.user._id.toString() !== req.user._id.toString())
    return next(
      new ErrorResponse(
        `You are not authorized to view the order with id ${orderId}`
      )
    )

  order.isPaid = true
  order.paidAt = Date.now()
  order.paymentResult = { id, status, update_time, email_address }

  const updatedOrder = await order.save()

  res.status(200).json({ success: true, data: updatedOrder })
})

const getMyOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id })

  res.status(200).json({ success: true, data: orders })
})

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders }
