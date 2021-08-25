import asyncHandler from 'express-async-handler'

import Product from '../models/product.js'
import ErrorResponse from '../utils/errorResponse.js'
import deleteFile from '../utils/file.js'

const getProducts = asyncHandler(async (req, res, next) => {
  const itemsPerPage = 10
  const page = +req.query.page || 1
  const q = req.query.q
    ? {
        name: {
          $regex: req.query.q,
          $options: 'i'
        }
      }
    : {}

  const total = await Product.countDocuments({ ...q })
  const products = await Product.find({ ...q })
    .skip(itemsPerPage * (page - 1))
    .limit(itemsPerPage)

  res.status(200).json({
    success: true,
    data: {
      products,
      page,
      pagesCount: Math.ceil(total / itemsPerPage)
    }
  })
})

const createProduct = asyncHandler(async (req, res, next) => {
  const userId = req.user._id

  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: userId,
    image: '/uploads/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description'
  })

  const createdProduct = await product.save()

  res.status(201).json({ success: true, data: createdProduct })
})

const getProductById = asyncHandler(async (req, res, next) => {
  const id = req.params.id

  const product = await Product.findById(id)
  if (!product)
    return next(new ErrorResponse(`Product not found with id of ${id}`), 404)

  res.status(200).json({ success: true, data: product })
})

const updateProduct = asyncHandler(async (req, res, next) => {
  const id = req.params.id

  const product = await Product.findById(id)
  if (!product)
    return next(new ErrorResponse(`Product not found with id of ${id}`), 404)

  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  })

  res.status(200).json({ success: true, data: updatedProduct })
})

const deleteProduct = asyncHandler(async (req, res, next) => {
  const id = req.params.id

  const product = await Product.findById(id)
  if (!product)
    return next(new ErrorResponse(`Product not found with id of ${id}`), 404)

  if (product.image && product.image !== '/uploads/sample.jpg')
    deleteFile(product.image)

  await product.remove()

  res.status(200).json({ success: true, data: {} })
})

const uploadProductimage = asyncHandler(async (req, res, next) => {
  const id = req.params.id
  const image = req.file

  const product = await Product.findById(id)

  if (!product)
    return next(new ErrorResponse(`Product not found with id of ${id}`, 404))

  if (!image) return next(new ErrorResponse(`Please upload an image`, 400))

  if (product.image && product.image !== '/uploads/sample.jpg')
    deleteFile(product.image)

  res.status(200).json({ success: true, data: `/${image.path}` })
})

export {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  uploadProductimage
}
