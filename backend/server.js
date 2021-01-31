// const express = require('express')
// const dotenv = require('dotenv')
// const products = require('./data/products')

// https://nodejs.org/api/esm.html
// to use ES modules in Node (v14.6+), add to package.json...also note when using import syntax in Node, you must add the file type extension
// "type": "module",

import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

// initialize db with mongoose
connectDB()

const app = express()

// request logger
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

// accept JSON data in req.body (replaces body-parser)
app.use(express.json())

// define api routes
// app.get('/', (req, res) => {
//   res.send('API is running')
// })
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

// route to provide safely stored (in .env) paypal id to client
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

// need to mimic default path __dirname behavior since it is not available with es modules syntax
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// set frontend/build as static folder when deployed so we can directly access it and load index.html
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  // any route that is not our api should go to static index.html build
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} else {
  app.get('/', (req, res) => {
      res.send('API is running')
    })
    
}


// CUSTOM ERROR HANDLING MIDDLEWARE USED IN CONJUNCTION WITH EXPRESS ASYNC HANDLER IN ROUTE CONTROLLERS
app.use(notFound)

// for error middleware
app.use(errorHandler)



const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))
