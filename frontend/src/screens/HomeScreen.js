import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'

const HomeScreen = () => {
	const [ products, setProducts ] = useState([])

	useEffect(() => {
		// can't make useEffect callback an async function so make a new function inside the callback block to be the async wrapper
		const fetchProducts = async () => {
			const { data } = await axios.get('/api/products') // add "proxy": "http://127.0.0.1:5000", to package.json
			setProducts(data)
		}
		fetchProducts()
	}, [])
	return (
		<React.Fragment>
			<h1>Latest Products</h1>
			<Row>
				{products.map((product) => (
					<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
						<Product {...product} />
					</Col>
				))}
			</Row>
		</React.Fragment>
	)
}

export default HomeScreen
