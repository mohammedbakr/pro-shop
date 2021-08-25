import express from 'express'

import {
  getProducts,
  getTopRatedProducts,
  getProductById,
  updateProduct,
  createProduct,
  deleteProduct,
  uploadProductimage
} from '../../controllers/product.js'
import reviewRoutes from './review.js'
import protect from '../../middleware/auth.js'
import isAdmin from '../../middleware/isAdmin.js'

const router = express.Router()

router.get('/', getProducts)

router.get('/top', getTopRatedProducts)

router.post('/', protect, isAdmin, createProduct)

router.get('/:id', getProductById)

router.put('/:id', protect, isAdmin, updateProduct)

router.delete('/:id', protect, isAdmin, deleteProduct)

router.post('/:id/upload', protect, isAdmin, uploadProductimage)

router.use('/:productId/reviews', reviewRoutes)

export default router
