import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ProfileScreen = ({ history }) => {
	const [ name, setName ] = useState('')
	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ confirmPassword, setConfirmPassword ] = useState('')
	const [ message, setMessage ] = useState(null)

	const dispatch = useDispatch()

	// check global state to see if user is logged in so we know if they should access Profile
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	// QUESTION...why not just use the userInfo from userLogin to populate the form?
	// get user details from global state to populate profile update form
	const userDetails = useSelector((state) => state.userDetails)
	const { user, loading, error } = userDetails

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
	const { success } = userUpdateProfile

	useEffect(
		() => {
			// if user is not logged in redirect to login page
			if (!userInfo) {
				history.push('/login')
			} else {
        // when component component is loaded there is nothing in the user state, so we need to dispatch action to get user details to populate form
				if (!user.name) {
          dispatch(getUserDetails('profile'))
          // once user details are in global state, use them to set form field values
				} else {
					setName(user.name)
					setEmail(user.email)
        }
        // // QUESTION...why not just use the userInfo from userLogin to populate the form?  this works
				// setName(userInfo.name)
        // setEmail(userInfo.email)
        // POSSIBLE ANSWER...because later when we update it that's the value we will want to use, and possibly the userLogin.userInfo will not update until the next time the user logs in 
			}
		},
		[ dispatch, history, userInfo, user ]
	)

	const submitHandler = (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			setMessage('Passwords do not match')
		} else {
      // dispatch update profile
      dispatch(updateUserProfile({ id: user._id, name, email, password}))
		}
	}

	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>
				{message && <Message variant='danger'>{message}</Message>}
				{error && <Message variant='danger'>{error}</Message>}
				{success && <Message variant='success'>Profile Updated</Message>}
				{loading && <Loader />}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId='name'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId='email'>
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId='password'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Enter password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId='confirmPassword'>
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Confirm password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</Form.Group>
					<Button type='submit' variant='primary'>
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>My Orders</h2>
			</Col>
		</Row>
	)
}

export default ProfileScreen
