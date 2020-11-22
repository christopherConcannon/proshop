import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body

	const userExists = await User.findOne({ email })

	if (userExists) {
		res.status(400)
		throw new Error('User already exists')
	}

	const user = await User.create({
		name,
		email,
		password
	})

	if (user) {
		res.status(201).json({
			_id     : user._id,
			name    : user.name,
			email   : user.email,
			isAdmin : user.isAdmin,
			token   : generateToken(user._id)
		})
	} else {
		res.status(400)
		throw new Error('Invalid user data')
	}
})

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email })

	// call instance method to match pw
	if (user && (await user.matchPassword(password))) {
		res.json({
			_id     : user._id,
			name    : user.name,
			email   : user.email,
			isAdmin : user.isAdmin,
			// call function to create and sign token, passing the user's id which will be embedded in the token and we can access when we decode
			token   : generateToken(user._id)
		})
	} else {
		// 404 - Unauthorized
		res.status(404)
		throw new Error('Invalid email or passwod')
	}
})

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
	// if req passed the 'protect' middleware on the route, the user's id (from the token) will be available on req.user
	const user = await User.findById(req.user._id)

	if (user) {
		res.json({
			_id     : user._id,
			name    : user.name,
			email   : user.email,
			isAdmin : user.isAdmin
		})
	} else {
		res.status(404)
		throw new Error('User not found')
	}
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)

	if (user) {
		user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    // only want to hash password if it has been updated (isModified)
		if (req.body.password) {
			user.password = req.body.password
		}

		const updatedUser = await user.save()
		res.json({
			_id     : updatedUser._id,
			name    : updatedUser.name,
			email   : updatedUser.email,
			isAdmin : updatedUser.isAdmin,
			token   : generateToken(updatedUser._id)
		})
	} else {
		res.status(404)
		throw new Error('User not found')
	}
})

export { authUser, getUserProfile, registerUser, updateUserProfile }
