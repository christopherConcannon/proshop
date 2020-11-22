import express from 'express'
const router = express.Router()
import { authUser, registerUser, getUserProfile, updateUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser)
// add middleWare as second arg
router.post('/login', authUser)
// to implement middleware, put the function as a first arg to route.get()
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

export default router
 