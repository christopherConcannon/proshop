import axios from 'axios'
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
	USER_DETAILS_RESET,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_UPDATE_PROFILE_FAIL,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_FAIL,
	USER_LIST_RESET,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL
} from '../constants/userConstants'
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'
import { CART_CLEAR_CART } from '../constants/cartConstants'

export const register = (name, email, password) => async (dispatch) => {
	try {
		dispatch({
			type : USER_REGISTER_REQUEST
		})

		const config = {
			headers : {
				'Content-Type' : 'application/json'
			}
		}

		// add user to db
		const { data } = await axios.post('/api/users', { name, email, password }, config)

		dispatch({
			type    : USER_REGISTER_SUCCESS,
			payload : data
		})

		// immediately login
		dispatch({
			type    : USER_LOGIN_SUCCESS,
			payload : data
		})

		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		dispatch({
			type    : USER_REGISTER_FAIL,
			payload :
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		})
	}
}

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type : USER_LOGIN_REQUEST
		})

    // when we're sending data, we want to send the Content-Type in the headers
		const config = {
			headers : {
				'Content-Type' : 'application/json'
			}
		}

		const { data } = await axios.post('/api/users/login', { email, password }, config)

		dispatch({
			type    : USER_LOGIN_SUCCESS,
			payload : data
		})

    // if user is authenticated add to local storage so id and token will be available
		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		dispatch({
			type    : USER_LOGIN_FAIL,
			payload :
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		})
	}
}

export const logout = () => (dispatch) => {
	localStorage.removeItem('userInfo')
	dispatch({ type: USER_LOGOUT })
	dispatch({ type: USER_DETAILS_RESET })
	dispatch({ type: ORDER_LIST_MY_RESET })
	dispatch({ type: USER_LIST_RESET })
	dispatch({ type: CART_CLEAR_CART })
}

// if coming from the ProfileScreen, the id parameter will be 'profile', from the UserEditScreen, it will have the user id
// we need to get our userInfo (with the token) from getState
export const getUserDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type : USER_DETAILS_REQUEST
		})

		// destructure nested userInfo object
		const { userLogin: { userInfo } } = getState()

		const config = {
			headers : {
				'Content-Type' : 'application/json',
				Authorization  : `Bearer ${userInfo.token}`
			}
		}

		// /api/users/profile -- or /api/users/:id
		const { data } = await axios.get(`/api/users/${id}`, config)

		dispatch({
			type    : USER_DETAILS_SUCCESS,
			payload : data
		})
	} catch (error) {
		dispatch({
			type    : USER_DETAILS_FAIL,
			payload :
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		})
	}
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
	try {
		dispatch({
			type : USER_UPDATE_PROFILE_REQUEST
		})

		// destructure nested userInfo object
		const { userLogin: { userInfo } } = getState()

		const config = {
			headers : {
				'Content-Type' : 'application/json',
				Authorization  : `Bearer ${userInfo.token}`
			}
		}

		const { data } = await axios.put(`/api/users/profile`, user, config)

		dispatch({
			type    : USER_UPDATE_PROFILE_SUCCESS,
			payload : data
		})
	} catch (error) {
		dispatch({
			type    : USER_UPDATE_PROFILE_FAIL,
			payload :
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		})
	}
}

export const listUsers = () => async (dispatch, getState) => {
	try {
		dispatch({
			type : USER_LIST_REQUEST
		})

		// destructure nested userInfo object
		const { userLogin: { userInfo } } = getState()

		const config = {
			headers : {
				Authorization : `Bearer ${userInfo.token}`
			}
		}

		const { data } = await axios.get(`/api/users`, config)

		dispatch({
			type    : USER_LIST_SUCCESS,
			payload : data
		})
	} catch (error) {
		dispatch({
			type    : USER_LIST_FAIL,
			payload :
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		})
	}
}

export const deleteUser = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type : USER_DELETE_REQUEST
		})

		// destructure nested userInfo object
		const { userLogin: { userInfo } } = getState()

		const config = {
			headers : {
				Authorization : `Bearer ${userInfo.token}`
			}
		}

		await axios.delete(`/api/users/${id}`, config)

		dispatch({
			type : USER_DELETE_SUCCESS
		})
	} catch (error) {
		dispatch({
			type    : USER_DELETE_FAIL,
			payload :
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		})
	}
}

export const updateUser = (user) => async (dispatch, getState) => {
	try {
		dispatch({
			type : USER_UPDATE_REQUEST
		})

		// destructure nested userInfo object
		const { userLogin: { userInfo } } = getState()

		const config = {
			headers : {
        'Content-Type': 'application/json',
				Authorization : `Bearer ${userInfo.token}`
			}
		}

		const { data } = await axios.put(`/api/users/${user._id}`, user, config)

		dispatch({
			type : USER_UPDATE_SUCCESS
    })
    // also need to dispatch updated details so they will trickle through state to populate form with updated data
		dispatch({
      type : USER_DETAILS_SUCCESS,
      payload: data
		})
	} catch (error) {
		dispatch({
      type    : USER_UPDATE_FAIL,
			payload :
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		})
	}
}
