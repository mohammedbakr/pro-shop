import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import { Row, Col, Image, Card, Button, ListGroup } from 'react-bootstrap'
import axios from 'axios'

import Rating from '../components/Rating'

const ProductScreen = ({ match }) => {
  const id = match.params.id
  const [product, setProduct] = useState({})

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`/api/v1/products/${id}`)

      setProduct(res.data.data)
    }

    fetchProduct()
  }, [id])

  return (
    <>
      <Link to='/'>
        <Button variant='light'>Go Back</Button>
      </Link>

      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  className='btn-block'
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen