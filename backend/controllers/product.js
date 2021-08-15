import asyncHandler from 'express-async-handler'

import Product from '../models/product.js'
import ErrorResponse from '../utils/errorResponse.js'

const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find()

  res.status(200).json({ success: true, data: products })
})

const getProductById = asyncHandler(async (req, res, next) => {
  const id = req.params.id

  const product = await Product.findById(id)
  if (!product)
    return next(new ErrorResponse(`Product not found with id of ${id}`), 404)

  res.status(200).json({ success: true, data: product })
})

export { getProducts, getProductById }
