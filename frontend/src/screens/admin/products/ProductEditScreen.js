import { useState, useEffect } from 'react'

import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../../../components/layout/Message'
import Loader from '../../../components/layout/Loader'
import FormContainer from '../../../components/layout/FormContainer'
import { getProductById, updateProduct } from '../../../store/actions'
import setAuthToken from '../../../axios/setAuth'

const ProductEditScreen = ({ history }) => {
  const { productId } = useParams()

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const authDetails = useSelector((state) => state.auth)
  const { auth, token } = authDetails

  const productDetails = useSelector((state) => state.product)
  const {
    product,
    loading,
    error,
    success: { updateSuccess }
  } = productDetails

  useEffect(() => {
    if (updateSuccess)
      setTimeout(() => {
        history.push('/admin/products')
      }, 2000)
    else {
      if (auth && token && auth.isAdmin) {
        if (
          !product ||
          !product.name ||
          product._id.toString() !== productId.toString()
        )
          dispatch(getProductById(productId))
        else {
          setName(product.name)
          setPrice(product.price)
          setImage(product.image)
          setBrand(product.brand)
          setCategory(product.category)
          setCountInStock(product.countInStock)
          setDescription(product.description)
        }
      } else history.push('/login')
    }
  }, [dispatch, history, productId, auth, token, product, updateSuccess])

  const uploadFileHandler = async (e) => {
    if (auth && token) setAuthToken(localStorage.token)

    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const { data } = await axios.post(
        `/api/v1/products/${productId}/upload`,
        formData
      )

      setImage(data.data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()

    const productData = {
      _id: productId,
      name,
      price,
      image,
      brand,
      category,
      description,
      countInStock
    }

    dispatch(updateProduct(productData))
  }

  return (
    <>
      <Link to='/admin/products' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {updateSuccess && (
          <Message variant='success'>
            Product updated successfully.
            <br />
            you will be redirected soon.
          </Message>
        )}
        {error && <Message variant='danger'>{error}</Message>}
        {loading ? (
          <Loader />
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control type='file' onChange={uploadFileHandler} />
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
