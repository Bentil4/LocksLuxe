import React from 'react';
import { Link } from 'react-router-dom';
import useFetchProducts from '../hooks/useFetchProducts';

export default function NavBar() {
	const orderId = localStorage.getItem('orderId');
	const { products } = useFetchProducts(`orders/${orderId}/items/list/`);

	return (
		<>
			<div className='navbar bg-base-200 px-6 h-fit z-50 border-b border-b-neutral-content'>
				<div className='navbar-start'>
					<div className='dropdown'>
						<label
							tabIndex={0}
							className='btn btn-ghost lg:hidden'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M4 6h16M4 12h8m-8 6h16'
								/>
							</svg>
						</label>
						<ul
							tabIndex={0}
							className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'>
							<li>
								<Link to='/'>Home</Link>
							</li>
							{/* <li>
								<a>Parent</a>
								<ul className='p-2'>
									<li>
										<a>Submenu 1</a>
									</li>
									<li>
										<a>Submenu 2</a>
									</li>
								</ul>
							</li> */}
							<li>
								<Link to='/products'>Products</Link>
							</li>
						</ul>
					</div>
					<a className='btn btn-ghost normal-case text-xl'>
						locksluxe
					</a>
				</div>

				<div className='navbar-center hidden lg:flex'>
					<ul className='menu menu-horizontal px-1'>
						<li>
							<Link to='/'>Home</Link>
						</li>
						{/* <li tabIndex={0}>
							<details>
								<summary>Parent</summary>
								<ul className='p-2'>
									<li>
										<a>Submenu 1</a>
									</li>
									<li>
										<a>Submenu 2</a>
									</li>
								</ul>
							</details>
						</li> */}
						<li>
							<Link to='/products'>Products</Link>
						</li>
					</ul>
				</div>
				<div className='navbar-end'>
					<Link to='/cart' className='indicator'>
						{/* Cart Icon */}
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-5 w-5'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
							/>
						</svg>
						{/* Cart Item Count Badge */}
						<span className='badge badge-sm badge-info indicator-item'>
							{products.length}
						</span>
					</Link>
				</div>
			</div>
		</>
	);
}
