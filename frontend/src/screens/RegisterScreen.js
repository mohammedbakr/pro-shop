import { useState, useEffect } from 'react'

import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import FormContainer from '../components/layout/FormContainer'
import Message from '../components/layout/Message'
import Loader from '../components/layout/Loader'
import { register } from '../store/actions'

const RegisterScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
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

    if (!name.trim() || !email.trim() || !password.trim())
      return setMessage('All Fields must be filled in')

    if (password !== confirmPassword)
      return setMessage('Passwords do not match')

    const authInfo = { name, email, password }

    dispatch(register(authInfo))
    setMessage('')
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

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

        <Form.Group className='mb-3' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button
          variant='dark'
          type='submit'
          disabled={
            !name.trim() ||
            !email.trim() ||
            !password.trim() ||
            !confirmPassword.trim()
          }
        >
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Already have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
