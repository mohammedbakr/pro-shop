import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container, PageItem } from 'react-bootstrap'
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
import UserListScreen from './screens/admin/users/UserListScreen'
import UserEditScreen from './screens/admin/users/UserEditScreen'
import ProductListScreen from './screens/admin/products/ProductListScreen'
import ProductEditScreen from './screens/admin/products/ProductEditScreen'
import OrderListScreen from './screens/admin/orders/OrderListScreen'
import PageNotFound from './components/layout/PageNotFound'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <main className='py-3'>
          <Container>
            <Switch>
              <Route
                path='/admin/users/:userId/edit'
                component={UserEditScreen}
              />
              <Route
                path='/admin/users/:page'
                component={UserListScreen}
                exact
              />
              <Route path='/admin/users' component={UserListScreen} exact />
              <Route
                path='/admin/products/:productId/edit'
                component={ProductEditScreen}
              />
              <Route
                path='/admin/products/:page'
                component={ProductListScreen}
                exact
              />
              <Route
                path='/admin/products'
                component={ProductListScreen}
                exact
              />
              <Route path='/admin/orders' exact component={OrderListScreen} />
              <Route path='/login' component={LoginScreen} />
              <Route path='/register' component={RegisterScreen} />
              <Route path='/profile' component={ProfileScreen} />
              <Route path='/shipping' component={ShippingScreen} />
              <Route path='/payment' component={PaymentScreen} />
              <Route path='/placeorder' component={PlaceOrderScreen} />
              <Route path='/orders/:orderId' component={OrderScreen} />
              <Route path='/products/:productId' component={ProductScreen} />
              <Route path='/cart/:productId?' component={CartItemsScreen} />
              <Route path='/search/:keyword' component={HomeScreen} exact />
              <Route path='/page/:page' component={HomeScreen} exact />
              <Route
                path='/search/:keyword/page/:page'
                component={HomeScreen}
                exact
              />
              <Route path='/' component={HomeScreen} exact />
              <Route component={PageNotFound} />
            </Switch>
          </Container>
        </main>
        <Footer />
      </Router>
    </Provider>
  )
}

export default App
