import products from '../data/products.js'

export const getProducts = (req, res, next) => {
  res.status(200).json(products)
}

export const getProduct = (req, res, next) => {
  const id = req.params.id

  const product = products.find((product) => product._id === id)

  if (!product) res.status(404).json({ success: false, data: [] })

  res.status(200).json(product)
}
