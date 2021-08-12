import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Provider } from 'react-redux'
import store from './store'

import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <main className='py-3'>
          <Container>
            <Route path='/' exact component={HomeScreen} />
            <Route path='/products/:id' component={ProductScreen} />
          </Container>
        </main>
        <Footer />
      </Router>
    </Provider>
  )
}

export default App
