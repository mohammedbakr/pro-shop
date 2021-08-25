import { useEffect } from 'react'

import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import Message from '../../../components/layout/Message'
import Loader from '../../../components/layout/Loader'
import {
  getProducts,
  createProduct,
  deleteProduct
} from '../../../store/actions'
import Paginate from '../../../components/layout/Paginate'

const ProductListScreen = ({ history }) => {
  const { page = 1 } = useParams()

  const authDetails = useSelector((state) => state.auth)
  const { auth, token } = authDetails

  const product = useSelector((state) => state.product)
  const {
    products,
    loading,
    error,
    success: { createSuccess, deleteSuccess },
    currentPage,
    pagesCount
  } = product

  const dispatch = useDispatch()

  const createdProduct = products[products.length - 1]

  useEffect(() => {
    if (auth && token && auth.isAdmin) {
      dispatch(getProducts('', page))
      // Not good for performance
      // Good for user experience
      if (createSuccess)
        history.push(`/admin/products/${createdProduct._id}/edit`)
    } else history.push('/login')
    // eslint-disable-next-line
  }, [dispatch, history, auth, token, createSuccess, page])

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id))
    }
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {createSuccess && (
        <Message variant='success'>Product created successfully</Message>
      )}
      {deleteSuccess && (
        <Message variant='success'>Product deleted successfully</Message>
      )}
      {error && <Message variant='danger'>{error}</Message>}
      {loading ? (
        <Loader />
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/products/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate
            page={currentPage}
            pages={pagesCount}
            path='products'
            isAdmin={true}
          />
        </>
      )}
    </>
  )
}

export default ProductListScreen
