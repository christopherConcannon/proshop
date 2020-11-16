// const express = require('express')
// const dotenv = require('dotenv')
// const products = require('./data/products')

// https://nodejs.org/api/esm.html
// to use ES modules in Node (v14.6+), add to package.json...also note when using import syntax in Node, you must add the file type extension
// "type": "module",

import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use('/api/products', productRoutes)

app.get('/', (req, res) => {
  res.send('API is running')
})



const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))
