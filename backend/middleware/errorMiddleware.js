// any errors in our routes will get picked up by this custom error middleware

// correctly formatted ObjectId, but not one that exists in db
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error) 
}

// bad route
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: err.message,
    // only want stack trace if not in production
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  })
}

export { notFound, errorHandler }