// const express = require('express')
// const dotenv = require('dotenv')
// const products = require('./data/products')

// https://nodejs.org/api/esm.html
// to use ES modules in Node (v14.6+), add to package.json...also note when using import syntax in Node, you must add the file type extension
// "type": "module",

import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import products from './data/products.js'

dotenv.config()

connectDB()

const app = express()

app.get('/', (req, res) => {
  res.send('API is running')
})

app.get('/api/products', (req, res) => {
  res.json(products)
})



app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id)
  res.json(product)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
