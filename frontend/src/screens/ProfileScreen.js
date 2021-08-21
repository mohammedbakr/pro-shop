import { useState, useEffect } from 'react'

import { Button, Col, Form, Row, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

import Message from '../components/layout/Message'
import Loader from '../components/layout/Loader'
import { listMyOrders, updateUserProfile } from '../store/actions'

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const authDetails = useSelector((state) => state.auth)
  const { auth, token, loading, error, success } = authDetails

  const myOrders = useSelector((state) => state.myOrders)
  const { orders, loading: loadingMyOrders, error: errorMyOrders } = myOrders

  useEffect(() => {
    if (!auth || !token) history.push('/login')

    setName(auth?.name)
    setEmail(auth?.email)

    dispatch(listMyOrders())
  }, [dispatch, history, auth, token])

  const submitHandler = (e) => {
    e.preventDefault()

    if (!name.trim() || !email.trim())
      return setMessage('Name and E-Mail must be filled in')

    if (password !== confirmPassword)
      return setMessage('Passwords do not match')

    const user = {
      id: auth.id,
      name,
      email,
      password
    }
    dispatch(updateUserProfile(user))
  }

  return (
    <Row>
      <Col md={4}>
        <h2>User profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && (
          <Message variant='success'>Profile Updated successfully</Message>
        )}
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
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant='dark' type='submit'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={8}>
        <h2>My orders</h2>
        {loadingMyOrders ? (
          <Loader />
        ) : errorMyOrders ? (
          <Message variant='danger'>{errorMyOrders}</Message>
        ) : (
          <Table className='table-sm' striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/orders/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
