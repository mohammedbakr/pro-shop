import asyncHandler from 'express-async-handler'

import Product from '../models/product.js'
import ErrorResponse from '../utils/errorResponse.js'

const createReview = asyncHandler(async (req, res, next) => {
  const productId = req.params.productId
  const { rating, comment } = req.body

  const product = await Product.findById(productId)
  if (!product)
    return next(
      new ErrorResponse(`Product not found with id of ${productId}`),
      404
    )

  const existedReview = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  )
  if (existedReview)
    return next(new ErrorResponse('You already reviewed this product', 400))

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: +rating,
    comment
  }

  product.reviews.push(review)
  product.numReviews = product.reviews.length
  product.rating =
    product.reviews.reduce((acc, review) => review.rating + acc, 0) /
    product.numReviews

  await product.save()

  res.status(201).json({ success: true })
})

export { createReview }
