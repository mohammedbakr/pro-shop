import express from 'express'

import { createReview } from '../../controllers/review.js'
import protect from '../../middleware/auth.js'

const router = express.Router({ mergeParams: true })

router.post('/', protect, createReview)

export default router
