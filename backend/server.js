// const express = require('express')
// const dotenv = require('dotenv')
// const products = require('./data/products')

// https://nodejs.org/api/esm.html
// to use ES modules in Node (v14.6+), add to package.json...also note when using import syntax in Node, you must add the file type extension
// "type": "module",

import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()

connectDB()

const app = express()

// accept JSON data in req.body (replaces body-parser)
app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

// route to provide safely stored (in .env) paypal id to client
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

app.get('/', (req, res) => {
  res.send('API is running')
})


app.use(notFound)

// for error middleware
app.use(errorHandler)



const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))
