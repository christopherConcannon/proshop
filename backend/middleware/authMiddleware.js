import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// add this to any route you want to restrict
const protect = asyncHandler(async (req, res, next) => {
	let token
	// console.log(req.headers.authorization)

	// https://www.w3schools.com/jsref/jsref_startswith.asp
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		// console.log('token found')
		try {
			// token will be after the space following 'Bearer ' so use .split()[1]
			token = req.headers.authorization.split(' ')[1]
			const decoded = jwt.verify(token, process.env.JWT_SECRET)

			// user's id will be in decoded.id.  we can assign a new property on req (req.user) and store the user that comes back from the db (excluding the password).  we will now have access to the req.user in all of the protected routes
			req.user = await User.findById(decoded.id).select('-password')

			next()
		} catch (error) {
			console.error(error)
			res.status(401)
			throw new Error('Not authorized, token failed')
		}
	}

	if (!token) {
		res.status(404)
		throw new Error('Not authorized, no token')
	}
})

const admin = (req, res, next) => {
  if(req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}

export { protect, admin }
