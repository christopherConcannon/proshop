import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  // call instance method to match pw
  if(user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      // call function to create and sign token, passing the user's id which will be embedded in the token and we can access when we decode
      token: generateToken(user._id)
    })
  } else {
    // 404 - Unauthorized
    res.status(404)
    throw new Error('Invalid email or passwod')
  }
})

export { 
  authUser
}
