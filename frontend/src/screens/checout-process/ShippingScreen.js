import { useState } from 'react'

import { Button, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

import CheckoutSteps from '../../components/CheckoutSteps'
import FormContainer from '../../components/layout/FormContainer'
import { saveshippingAddress } from '../../store/actions'

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const dispatch = useDispatch()

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setcountry] = useState(shippingAddress.country)

  const submitHandler = (e) => {
    e.preventDefault()

    const data = { address, city, postalCode, country }

    dispatch(saveshippingAddress(data))

    history.push('/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='adress'>
          <Form.Label>Adress</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Adress'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter City'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='postalCode'>
          <Form.Label>Postal code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Postal code'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Country'
            value={country}
            onChange={(e) => setcountry(e.target.value)}
            required
          />
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
