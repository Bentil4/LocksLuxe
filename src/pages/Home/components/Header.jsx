import React from 'react';
import img1 from '../../../../backend/media/Products/2.jpg';
import { Link } from 'react-router-dom';
export default function Header() {
	return (
		<div>
			<div className='grid grid-flow-row grid-cols-2  h-full items-center  justify-between'>
				<div className='flex items-center'>
					<div className='p'>
						<div className='capitalize font-extrabold text-primary text-5xl'>
							Welcome to Lucksluxe
						</div>

						<p className='text-lg my-5'>
							We offer the best and quality wigs at affordable prices to our beloved customers.
						</p>
						<Link to={'/products'} className='btn btn-secondary'>
							view product
						</Link>
					</div>
				</div>

				<div className='ml-28 max-w-lg flex justify-center  '>
					<img src={img1} className='w-full rounded-lg h-fit' />
				</div>
			</div>
		</div>
	);
}
