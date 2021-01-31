import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listProducts } from '../actions/productActions'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'

const HomeScreen = ({ match }) => {
	// get search term if this render is the result of a search
	const keyword = match.params.keyword
	const pageNumber = match.params.pageNumber || 1

	const dispatch = useDispatch()

	const productList = useSelector((state) => state.productList)
	const { products, page, pages, loading, error } = productList

	useEffect(
		() => {
			// dispatch action to get products.  pass keyword if it is a search
			dispatch(listProducts(keyword, pageNumber))
		},
		[ dispatch, keyword, pageNumber ]
	)

	return (
		<React.Fragment>
      {/* dynamically display title and meta tags in .html head.  Pass props to customize for each component (see ProductScreen) */}
			<Meta />
      {/* if no keyword, it's not a search so show carousel */}
			{!keyword ? (
				<ProductCarousel />
			) : (
        // otherwise show back button with search results
				<Link to='/' className='btn btn-light'>
					Go Back
				</Link>
			)}
			<h1>Latest Products</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<React.Fragment>
					<Row>
						{products.map((product) => (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
								<Product {...product} />
							</Col>
						))}
					</Row>
					<Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
				</React.Fragment>
			)}
		</React.Fragment>
	)
}

export default HomeScreen
