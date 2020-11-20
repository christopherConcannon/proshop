import express from 'express'
const router = express.Router()
import { authUser, registerUser, getUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser)
router.post('/login', authUser)
// to implement middleware, put the function as a first arg to route.get()
router.route('/profile').get(protect, getUserProfile)

export default router
