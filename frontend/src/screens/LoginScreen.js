import { useState, useEffect } from 'react'

import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import FormContainer from '../components/layout/FormContainer'
import Message from '../components/layout/Message'
import Loader from '../components/layout/Loader'
import { login } from '../store/actions'

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const queryParams = new URLSearchParams(useLocation().search)
  const redirect = queryParams.get('redirect') || '/'

  const dispatch = useDispatch()

  const authDetails = useSelector((state) => state.auth)
  const { auth, token, loading, error } = authDetails

  useEffect(() => {
    if (auth && token) history.push(redirect)
  }, [history, redirect, auth, token])

  const submitHandler = (e) => {
    e.preventDefault()

    if (!email.trim() || !password.trim())
      return setMessage('All Fields must be filled in')

    dispatch(login(email, password))
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button
          variant='dark'
          type='submit'
          disabled={!email.trim() || !password.trim()}
        >
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
