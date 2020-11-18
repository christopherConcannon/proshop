import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, listProducts } from '../actions/productActions'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'

// https://reactrouter.com/core/api/match -- React Router has match object with params prop (also see useParams()).  also has a history prop that allows you to push https://reactrouter.com/core/api/history
const ProductScreen = ({ history, match }) => {
	const [ qty, setQty ] = useState(1)

	const dispatch = useDispatch()

	const productDetails = useSelector((state) => state.productDetails)
	const { product, loading, error } = productDetails

	useEffect(
		() => {
			dispatch(listProductDetails(match.params.id))
		},
		[ match, dispatch ]
  )
  // go to cart page with some parameters (product id and qty as query string -- http://localhost:3000/cart/5fb30918449c928f9cb54b18?qty=2)
  const addToCartHandler = () => {
    // props.history.push will redirect
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

	return (
		<React.Fragment>
			<Link className='btn btn-light my-3' to='/'>
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					<Col md={6}>
						{/* pass fluid prop to keep image in it's container */}
						<Image src={product.image} alt={product.name} fluid />
					</Col>
					<Col md={3}>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h3>{product.name}</h3>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating value={product.rating} text={`${product.numReviews} reviews`} />
							</ListGroup.Item>
							<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
							<ListGroup.Item>Description: {product.description}</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong>${product.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Status:</Col>
										<Col>{product.countInStock > 0 ? 'In stock' : 'Out of stock'}</Col>
									</Row>
								</ListGroup.Item>

								{product.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Qty</Col>
											<Col>
												<Form.Control
													as='select'
													value={qty}
													onChange={(e) => setQty(e.target.value)}
												>
													{/* When Array is called as a function rather than as a constructor, it creates and initialises a new Array object. Thus the function call Array(...) is equivalent to the object creation expression new Array(...) with the same arguments. */}
													{/* so...create an array of length = countInStock.  spread the keys (so the indices starting at 0) of this new array into another array.  this way we obtain the numbers to display in the qty options, ranging from 1 to the countInStock (once we add 1 to x)  */}
													{/* [0,1,2,3,4] */}
													{[...Array(product.countInStock).keys()].map(x => (
													<option key={x + 1} value={x + 1}>
														{x + 1}
													</option>
													))}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}

								<ListGroup.Item>
									<Button
										className='btn-block'
										type='button'
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
									>
										Add To Cart
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</React.Fragment>
	)
}

export default ProductScreen
