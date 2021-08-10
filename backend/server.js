import express from 'express'
import dotenv from 'dotenv'

import productRoutes from './routes/v1/products.js'

// Load env variables
dotenv.config()

const app = express()

// Middlewares
app.use(express.json())

// Using Routes
app.use('/api/v1/products', productRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)
