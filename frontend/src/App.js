import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Route path='/register' component={RegisterScreen} />
					<Route path='/login' component={LoginScreen} />
					<Route path='/profile' component={ProfileScreen} />
					<Route path='/shipping' component={ShippingScreen} />
					<Route path='/payment' component={PaymentScreen} />
					<Route path='/placeorder' component={PlaceOrderScreen} />
					<Route path='/product/:id' component={ProductScreen} />
					{/* optional id */}
					<Route path='/cart/:id?' component={CartScreen} />
					<Route exact path='/' component={HomeScreen} />
				</Container>
			</main>
			<Footer />
		</Router>
	)
}

export default App
