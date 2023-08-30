import React from 'react';
import { Link } from 'react-router-dom';
import useAddToCart from '../hooks/useAddToCart';
import { useNavigation } from '../contexts/NavigationContext';

export default function ProductCard({
	availability,
	id,
	image,
	name,
	price,
	rating,
}) {
	const { addCartItem, addingToCart, addingError } = useAddToCart();
	const navigation = useNavigation();

	const handleAddToCart = async (productId) => {
		await addCartItem(productId);
		navigation.refreshNavigation();
	};

	const rate = (rate) => {
		const stars = [];
		for (let i = 1; i <= rate; i++) {
			stars.push(
				<svg
					width='16'
					height='15'
					viewBox='0 0 16 15'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M14.673 7.17173C15.7437 6.36184 15.1709 4.65517 13.8284 4.65517H11.3992C10.7853 4.65517 10.243 4.25521 10.0617 3.66868L9.33754 1.32637C8.9309 0.0110567 7.0691 0.0110564 6.66246 1.32637L5.93832 3.66868C5.75699 4.25521 5.21469 4.65517 4.60078 4.65517H2.12961C0.791419 4.65517 0.215919 6.35274 1.27822 7.16654L3.39469 8.78792C3.85885 9.1435 4.05314 9.75008 3.88196 10.3092L3.11296 12.8207C2.71416 14.1232 4.22167 15.1704 5.30301 14.342L7.14861 12.9281C7.65097 12.5432 8.34903 12.5432 8.85139 12.9281L10.6807 14.3295C11.7636 15.159 13.2725 14.1079 12.8696 12.8046L12.09 10.2827C11.9159 9.71975 12.113 9.10809 12.5829 8.75263L14.673 7.17173Z'
						fill='#FFAD33'
					/>
				</svg>,
			);
		}
		return stars;
	};

	const discount = Math.round(Math.random() * -100);
	return (
		<div className='relative p-5   m-10 w-full max-w-xs overflow-hidden group rounded-lg bg-base-200 shadow-md font-sans'>
			<div className='absolute left-5 top-5 confirmPopUp justify-between z-10'>
				<span
					className={`rounded-md p-1 px-3 text-xs  text-white ${
						availability && 'bg-error'
					}`}>
					{discount}
				</span>
			</div>
			<div className='overflow-hidden relative'>
				<Link to={`/products/${id}`}>
					<img
						className='max-h-60 rounded-lg bg-contain w-full m'
						src={`../../backend/${image}`}
						alt={`${name}`}
					/>
				</Link>
			</div>

			<div className='mt-4 pb-5 text-black'>
				<Link to={`/products/${id}`}>
					<h5 className='text-lg font-bold tracking-tightw  capitalize'>
						{name}
					</h5>
				</Link>

				<div className=' confirmPopUp justify-between'>
					<p className='font-bold text-error  '>
						$ {price}
						<span className='line-through ml-3 text-black font-normal'>
							$ {Math.round(price - 10 * discount)}
						</span>
					</p>
					<p className='flex text-xl confirmPopUp mt-2'>
						{rate(rating)}{' '}
						<span className='text-sm'>
							({Math.round(Math.random() + 10)})
						</span>
						<button
							className=' btn w- hidden group-hover:flex absolute right-2 bottom-2 '
							onClick={() => handleAddToCart(id)}
							disabled={addingToCart}>
							{addingToCart ? 'Adding...' : 'Add to Cart'}
						</button>
					</p>
				</div>
			</div>
		</div>
	);
}
