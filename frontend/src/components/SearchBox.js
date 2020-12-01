import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

// since this component is in the Header component we won't have direct access to the history props from Router so we will need to use render props
const SearchBox = ({ history }) => {
  const [ keyword, setKeyword ] = useState('')
  
  const submitHandler = (e) => {
    e.preventDefault()
    if(keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

	return (
		<Form onSubmit={submitHandler} inline>
			<Form.Control
				type='text'
				name='q'
				onChange={(e) => setKeyword(e.target.value)}
				placeholder='Search products...'
				className='mr-sm-2 ml-sm-5'
			></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2'>
        Search
      </Button>
		</Form>
	)
}

export default SearchBox