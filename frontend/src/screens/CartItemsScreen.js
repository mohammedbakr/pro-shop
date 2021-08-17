import { useEffect } from 'react'

import { Card, Col, Row, ListGroup, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation, useParams } from 'react-router-dom'

import CartItem from '../components/CartItem'
import Message from '../components/layout/Message'
import { addtoCart } from '../store/actions'

const CartItemsScreen = ({ history }) => {
  const { productId } = useParams()
  const queryParams = new URLSearchParams(useLocation().search)
  const qty = +queryParams.get('qty') || 1

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const dispatch = useDispatch()

  useEffect(() => {
    if (productId) dispatch(addtoCart(productId, qty))
  }, [dispatch, productId, qty])

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          cartItems.map((item) => <CartItem key={item.product} item={item} />)
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartItemsScreen
