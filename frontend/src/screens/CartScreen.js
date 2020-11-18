import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../actions/cartActions'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'



// props.location.search from React Router will give us the query string with the qty
const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id

  // location.search returns ?qty=1...get the value after the equal sign with split
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  console.log(cartItems);

  // we can visit the cart just through the link in which case there will be no product id or query string.  if we are coming after a click on Add to Cart in the ProductScreen there will be product id and qty which we will use to update state
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  return (
    <div>
      cart
    </div>
  )
}

export default CartScreen
