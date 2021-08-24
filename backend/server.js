import path from 'path'

import express from 'express'
import dotenv from 'dotenv'

import productRoutes from './routes/v1/product.js'
import authRoutes from './routes/v1/auth.js'
import userRoutes from './routes/v1/user.js'
import orderRoutes from './routes/v1/order.js'
import configRoutes from './routes/v1/config.js'
import multer from './utils/multer.js'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/error.js'

// Load env variables
dotenv.config()

connectDB()

const app = express()

// Middlewares
app.use(express.json())
// Multer
app.use(multer)

// Using Routes
app.use('/api/v1/products', productRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/orders', orderRoutes)
app.use('/api/v1/config', configRoutes)

// Serving images as static
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Error handler middlewares
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)
