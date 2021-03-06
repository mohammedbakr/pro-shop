import React, { useState, useEffect, useRef } from 'react'

import axios from 'axios'
import { Card, Col, ListGroup, Row, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { PayPalButton } from 'react-paypal-button-v2'

import CheckoutCartItems from '../components/CheckoutCartItem'
import Message from '../components/layout/Message'
import Loader from '../components/layout/Loader'
import { getOrderById, payOrder, deliverOrder } from '../store/actions'
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../store/types/orderTypes'

const OrderScreen = ({ history }) => {
  const { orderId } = useParams()

  const [sdkReady, setSdkReady] = useState(false)

  const authDetails = useSelector((state) => state.auth)
  const { auth, token } = authDetails

  const orderDetails = useSelector((state) => state.order)
  const { order, error, loading } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const dispatch = useDispatch()

  const script = useRef('script')

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      +order.orderItems.reduce((acc, item) => acc + +item.price * +item.qty, 0)
    )
  }

  useEffect(() => {
    if (auth && token) {
      const addPaypalScript = async () => {
        // Renaming in destructuring
        const { data: clientId } = await axios.get('/api/v1/config/paypal')
        script.current.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
        script.current.async = true
        setSdkReady(true)
      }

      if (!order || successPay || successDeliver || order._id !== orderId) {
        dispatch({ type: ORDER_PAY_RESET })
        dispatch({ type: ORDER_DELIVER_RESET })
        dispatch(getOrderById(orderId))
      } else if (!order.isPaid)
        if (!window.paypal) addPaypalScript()
        else setSdkReady(true)
    } else history.push('/login')
  }, [
    dispatch,
    history,
    auth,
    token,
    order,
    successPay,
    successDeliver,
    orderId
  ])

  const successPaymentHandler = (paymentResult) =>
    dispatch(payOrder(order._id, paymentResult))

  const deliverHandler = () => dispatch(deliverOrder(orderId))

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: {order.user.name}</strong>
              </p>
              <p>
                <strong>
                  Email:{' '}
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </strong>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                order.orderItems.map((item) => (
                  <CheckoutCartItems key={item.product} item={item} />
                ))
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {auth && auth.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn btn-block'
                    onClick={deliverHandler}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <script ref={script}></script>
    </>
  )
}

export default OrderScreen
