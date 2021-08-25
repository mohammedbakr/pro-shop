import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'

import Product from '../components/Product'
import Loader from '../components/layout/Loader'
import Message from '../components/layout/Message'
import Paginate from '../components/layout/Paginate'
import Meta from '../components/Meta'
import ProductCarousel from '../components/ProductCarousel'
import { getProducts } from '../store/actions'

const HomeScreen = () => {
  const { keyword } = useParams()
  const { page = 1 } = useParams()

  const dispatch = useDispatch()

  const product = useSelector((state) => state.product)
  const { loading, error, products, currentPage, pagesCount } = product

  useEffect(() => {
    dispatch(getProducts(keyword, page))
  }, [dispatch, keyword, page])

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            page={currentPage}
            pages={pagesCount}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
