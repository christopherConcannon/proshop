import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'

// props.location.search from React Router will give us the query string with the qty
const CartScreen = ({ match, location, history }) => {


	const dispatch = useDispatch()

	const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  
  // ADD TO CART DISPATCH MOVED TO PRODUCT SCREEN TO ADDRESS BUG WHEN TRYING TO UPDATE QTY OF CART ITEM FROM CART SCREEN.  BECAUSE OF THE USE OF PARAMS TO SPECIFY QTY, IF YOU UPDATE QTY THEN REFRESH, THE VALUE REVERTS TO THE VALUE IN QUERY STRING
  // const productId = match.params.id

	// // location.search returns ?qty=1...get the value after the equal sign with split
	// const qty = location.search ? Number(location.search.split('=')[1]) : 1

	// // we can visit the cart just through the link in which case there will be no product id or query string.  if we are coming after a click on Add to Cart in the ProductScreen there will be product id and qty which we will use to update state
	// useEffect(
	// 	() => {
	// 		if (productId) {
	// 			dispatch(addToCart(productId, qty))
	// 		}
	// 	},
	// 	[ dispatch, productId, qty ]
  // )
  
	const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  
  const checkoutHandler = () => {
    // NOTE...go back to lectures 34, 44 to see how this redirect is working once user logs in 
    // redirect to login unless there is a query string of redirect set to shipping.  if not logged in, go to log in, if they are logged in, go to shipping
    history.push('/login?redirect=shipping')

  }

	return (
		<Row>
			<Col md={8}>
				<h1>Shopping Cart</h1>
				{cartItems.length === 0 ? (
					<Message>
						Your cart is empty <Link to='/'>Go Back</Link>
					</Message>
				) : (
					<ListGroup variant='flush'>
						{cartItems.map((item) => (
							<ListGroup.Item key={item.product}>
								<Row>
									<Col md={2}>
										<Image src={item.image} alt={item.name} fluid rounded />
									</Col>
									<Col md={3}>
										<Link to={`/product/${item.product}`}>{item.name}</Link>
									</Col>
									<Col md={2}>${item.price}</Col>
									<Col md={2}>
										<Form.Control
											as='select'
											value={item.qty}
											onChange={(e) =>
												dispatch(addToCart(item.product, Number(e.target.value)))}
										>
											{[ ...Array(item.countInStock).keys() ].map((x) => (
												<option key={x + 1} value={x + 1}>
													{x + 1}
												</option>
											))}
										</Form.Control>
									</Col>
									<Col md={2}>
										<Button
											type='button'
											variant='light'
											onClick={() => removeFromCartHandler(item.product)}
										>
											<i className='fas fa-trash' />
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>
								Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
							</h2>
							${cartItems
								.reduce((acc, item) => acc + item.qty * item.price, 0)
								.toFixed(2)}
						</ListGroup.Item>
            <ListGroup.Item>
              <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>Proceed to checkout</Button>
            </ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	)
}

export default CartScreen
