// App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Product from './pages/Product';
import Payment from './pages/Payment';
import Detail from './pages/[id]';
import Cart from './pages/Cart';

import NavBar from './components/NavBar';
import { NavigationProvider } from './contexts/NavigationContext'; // Import the NavigationProvider

export default function App() {
	return (
		<NavigationProvider>
			<div className='font-sans'>
				<div className=' fixed w-full z-50'>
					<NavBar  />
				</div>
				<div className='grid justify-center  flex-1 md:px-20 pt-20 '>
					<Routes>
						<Route path='/' index element={<Home />} />
						<Route path='/products' element={<Product />} />
						<Route path='/payment' element={<Payment />} />
						<Route
							path='/products/:id'
							element={<Detail />}
						/>

						<Route
							path='/cart'
							element={<Cart />}
						/>
						

						<Route path='*' element={<h1>notfound</h1>} />
					</Routes>
				</div>
			</div>
		</NavigationProvider>
	);
}
