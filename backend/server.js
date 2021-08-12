import express from 'express'
import dotenv from 'dotenv'

import productRoutes from './routes/v1/products.js'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/error.js'

// Load env variables
dotenv.config()

connectDB()

const app = express()

// Middlewares
app.use(express.json())

// Using Routes
app.use('/api/v1/products', productRoutes)

// Error handler middlewares
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)
