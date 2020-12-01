import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
	// if there is only 1 page of results (pages === 1) we don't need this component
	return (
		pages > 1 && (
			<Pagination>
				{/* we need to take number of pages and map through that number of times as an array */}
				{[ ...Array(pages).keys() ].map((x) => (
					<LinkContainer
						key={x + 1}
						to={
							!isAdmin ? keyword ? (
								`/search/${keyword}/page/${x + 1}`
							) : (
								`/page/${x + 1}`
							) : (
								`/admin/productlist/${x + 1}`
							)
						}
					>
						<Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
					</LinkContainer>
				))}
			</Pagination>
		)
	)

	return <div />
}

export default Paginate
