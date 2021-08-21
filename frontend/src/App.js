import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Provider } from 'react-redux'
import store from './store'

import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartItemsScreen from './screens/CartItemsScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/checout-process/ShippingScreen'
import PaymentScreen from './screens/checout-process/PaymentScreen'
import PlaceOrderScreen from './screens/checout-process/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <main className='py-3'>
          <Container>
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/orders/:id' component={OrderScreen} />
            <Route path='/products/:id' component={ProductScreen} />
            <Route path='/cart/:productId?' component={CartItemsScreen} />
            <Route path='/' exact component={HomeScreen} />
          </Container>
        </main>
        <Footer />
      </Router>
    </Provider>
  )
}

export default App
