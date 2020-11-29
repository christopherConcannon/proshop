import express from 'express'
const router = express.Router()
import {
	authUser,
	registerUser,
	getUserProfile,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUserById,
	updateUser
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, admin, getUsers)
// add middleWare as second arg
router.post('/login', authUser)
// to implement middleware, put the function as a first arg to route.get()
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router
	.route('/:id')
	.delete(protect, admin, deleteUser)
	.get(protect, admin, getUserById)
	.put(protect, admin, updateUser)

export default router
