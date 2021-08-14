import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { addtoCart, removeFromCart } from '../store/actions'

const CartItem = ({ item }) => {
  const dispatch = useDispatch()

  const removeFromCartHandler = (id) => dispatch(removeFromCart(id))

  return (
    <ListGroup variant='flush'>
      <ListGroup.Item>
        <Row>
          <Col md={2}>
            <Image src={item.image} alt={item.name} fluid rounded />
          </Col>
          <Col md={3}>
            <Link to={`/products/${item.product}`}>{item.name}</Link>
          </Col>
          <Col md={2}>${item.price}</Col>
          <Col md={2}>
            <Form.Select
              value={item.qty}
              onChange={(e) =>
                dispatch(addtoCart(item.product, +e.target.value))
              }
            >
              {[...Array(item.countInStock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={2}>
            <Button
              type='button'
              variant='danger'
              onClick={() => removeFromCartHandler(item.product)}
            >
              <i className='fas fa-trash'></i>
            </Button>
          </Col>
        </Row>
      </ListGroup.Item>
    </ListGroup>
  )
}

export default CartItem
