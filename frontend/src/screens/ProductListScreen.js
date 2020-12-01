import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'

const ProductListScreen = ({ history, match }) => {
	const pageNumber = match.params.pageNumber || 1

	const dispatch = useDispatch()

	const productList = useSelector((state) => state.productList)
	const { products, page, pages, loading, error } = productList

	const productDelete = useSelector((state) => state.productDelete)
	const {
		loading : loadingDelete,
		error   : errorDelete,
		success : successDelete
	} = productDelete

	const productCreate = useSelector((state) => state.productCreate)
	const {
		product : createdProduct,
		loading : loadingCreate,
		error   : errorCreate,
		success : successCreate
	} = productCreate

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	useEffect(
		() => {
			dispatch({ type: PRODUCT_CREATE_RESET })

			if (!userInfo.isAdmin) {
				history.push('/login')
			}

			if (successCreate) {
				history.push(`/admin/product/${createdProduct._id}/edit`)
			} else {
				// no keyword
				dispatch(listProducts('', pageNumber))
			}
		},
		[
			userInfo,
			dispatch,
			history,
			successDelete,
			successCreate,
			createdProduct,
			pageNumber
		]
	)

	const createProductHandler = () => {
		// create product
		dispatch(createProduct())
	}

	const deleteHandler = (id) => {
		console.log('delete products')
		if (window.confirm('Are you sure you want to remove this product?')) {
			dispatch(deleteProduct(id))
		}
	}

	return (
		<React.Fragment>
			<Row className='align-items-center'>
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className='text-right'>
					<Button className='my-3' onClick={createProductHandler}>
						<i className='fas fa-plus' /> Create Product
					</Button>
				</Col>
			</Row>
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant='danger'>{errorDelete}</Message>}
			{loadingCreate && <Loader />}
			{errorCreate && <Message variant='danger'>{errorCreate}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<React.Fragment>
					<Table striped bordered hover responsive className='table-sm'>
						<thead>
							<tr>
								<th>ID</th>
								<th>NAME</th>
								<th>PRICE</th>
								<th>CATEGORY</th>
								<th>BRAND</th>
								<th />
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr key={product._id}>
									<td>{product._id}</td>
									<td>{product.name}</td>
									<td>${product.price}</td>
									<td>{product.category}</td>
									<td>{product.brand}</td>
									<td>
										<LinkContainer to={`/admin/product/${product._id}/edit`}>
											<Button variant='light' className='btn-sm'>
												<i className='fas fa-edit' />
											</Button>
										</LinkContainer>
										<Button
											variant='danger'
											className='btn-sm'
											onClick={() => deleteHandler(product._id)}
										>
											<i className='fas fa-trash' />
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
					<Paginate pages={pages} page={page} isAdmin={true} />
				</React.Fragment>
			)}
		</React.Fragment>
	)
}

export default ProductListScreen
