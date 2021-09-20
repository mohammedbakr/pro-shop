import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  const location = useLocation()

  return (
    <>
      <h4>
        Page Not Found with URL: <code>{location.pathname}</code>{' '}
      </h4>
      <Link to='/'>
        <h5 style={{ textDecoration: 'underline', color: 'blue' }}>
          Go Home Page
        </h5>
      </Link>
    </>
  )
}

export default PageNotFound
