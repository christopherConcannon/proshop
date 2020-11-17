import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'

const HomeScreen = () => {
	const dispatch = useDispatch()

	const productList = useSelector((state) => state.productList)
	const { products, loading, error } = productList

	useEffect(
		() => {
			// dispatch action to get products
			dispatch(listProducts())
		},
		[ dispatch ]
  )
  
	return (
		<React.Fragment>
			<h1>Latest Products</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					{products.map((product) => (
						<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
							<Product {...product} />
						</Col>
					))}
				</Row>
			)}
		</React.Fragment>
	)
}

export default HomeScreen
