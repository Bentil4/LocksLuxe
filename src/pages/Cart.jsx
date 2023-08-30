import React from 'react';
import CartItems from '../components/CartDetails';
import { Link } from 'react-router-dom';

export default function Cart() {
	return (
		<div>
			<h1 className='my-5 text-center text-2xl relative'>
				<span >
					<Link
						className='btn absolute left-0 btn-xs top-3 btn-link '
						to={'/products'}>
						continue shoping
					</Link>
				</span>
				Your Cart
			</h1>
			<CartItems />
		</div>
	);
}
