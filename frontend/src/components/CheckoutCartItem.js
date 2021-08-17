import { Col, Image, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CheckoutCartItems = ({ item }) => {
  return (
    <ListGroup variant='flush'>
      <ListGroup.Item>
        <Row>
          <Col md={2}>
            <Image src={item.image} alt={item.name} fluid rounded />
          </Col>

          <Col>
            <Link to={`/products/${item.product}`}>{item.name}</Link>
          </Col>

          <Col md={4}>
            {item.qty} X ${item.price} = ${item.qty * item.price}
          </Col>
        </Row>
      </ListGroup.Item>
    </ListGroup>
  )
}

export default CheckoutCartItems
