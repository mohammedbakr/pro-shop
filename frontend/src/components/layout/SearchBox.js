import { useState } from 'react'

import { Form, Button, Row, Col } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()

    if (!keyword.trim()) history.push('/')
    else history.push(`/search/${keyword}`)
  }

  return (
    <Form onSubmit={submitHandler}>
      <Row>
        <Col xs='auto' className='pr-0'>
          <Form.Control
            type='text'
            name='q'
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='Search Products...'
          ></Form.Control>
        </Col>
        <Col xs='auto' className='pl-1'>
          <Button type='submit' variant='outline-success' className='p-2'>
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default SearchBox
