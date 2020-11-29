import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  // FOR TESTING ERROR MESSAGES
  // res.status(401)
  // throw new Error('Not Authorized')
  res.json(products)
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  // FOR TESTING ERROR MESSAGES
  // res.status(401)
  // throw new Error('Not Authorized')

  if (product) {
    res.json(product)
  } else {
    // default error status will be 500, but we can set our own
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: 'Product removed'})
  } else {
    // default error status will be 500, but we can set our own
    res.status(404)
    throw new Error('Product not found')
  }
})

export {
  getProducts, 
  getProductById,
  deleteProduct
}