import axios from 'axios'
import { CART_ADD_ITEM } from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: { 
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty
    }
  })

  // eachtime we add the new item to cart, we want to add the updated entire cart to localStorage
  // https://redux.js.org/api/store/#getstate
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}