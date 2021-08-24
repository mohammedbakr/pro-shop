import { useState, useEffect } from 'react'

import { Link, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../../../components/layout/Message'
import Loader from '../../../components/layout/Loader'
import FormContainer from '../../../components/layout/FormContainer'
import { getUserById, updateUser } from '../../../store/actions'

const UserEditScreen = ({ history }) => {
  const { userId } = useParams()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const authDetails = useSelector((state) => state.auth)
  const { auth, token } = authDetails

  const userDetails = useSelector((state) => state.user)
  const {
    user,
    loading,
    error,
    success: { updateSuccess }
  } = userDetails

  useEffect(() => {
    if (updateSuccess)
      setTimeout(() => {
        history.push('/admin/users')
      }, 2000)
    else {
      if (auth && token && auth.isAdmin) {
        if (!user.name || user._id.toString() !== userId.toString())
          dispatch(getUserById(userId))
        else {
          setName(user?.name)
          setEmail(user?.email)
          setIsAdmin(user?.isAdmin)
        }
      } else history.push('/login')
    }
  }, [dispatch, history, userId, auth, token, user, updateSuccess])

  const submitHandler = (e) => {
    e.preventDefault()

    const userData = { _id: userId, name, email, isAdmin }

    dispatch(updateUser(userData))
  }

  return (
    <>
      <Link to='/admin/users' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {updateSuccess && (
          <Message variant='success'>
            User updated successfully.
            <br />
            you will be redirected soon.
          </Message>
        )}
        {error && <Message variant='danger'>{error}</Message>}
        {loading ? (
          <Loader />
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className='mb-3' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='mb-3' controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='mb-3' controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
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

export default UserEditScreen
