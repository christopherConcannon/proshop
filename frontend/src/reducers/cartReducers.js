import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch(action.type) {
    case CART_ADD_ITEM:
      const item = action.payload
      // check if new item is already in cart
      const existItem = state.cartItems.find(x => x.product === item.product)
      // if so
      if (existItem) {
        return {
          ...state,
          // map a new array.  where the current item in state is the same, replace it with the new item (which includes it's new qty), for the rest of the current items, just return them
          cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
        }
      // otherwise just push the new item to the array
      } else {
        return {
          // everything that's in the current state
          ...state,
          // update the cartItems to a new array with the current items spread out, then add the new item to the array
          cartItems: [...state.cartItems, item]
        }
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(x => x.product !== action.payload)
      }

    default:
      return state
  }
}