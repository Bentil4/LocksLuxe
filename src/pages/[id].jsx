import React from 'react';
import delivery from '../assets/delivery.svg';
import returns from '../assets/return.svg';
import { useParams, Link } from 'react-router-dom';
import useFetchProducts from '../hooks/useFetchProducts';
import useAddToCart from '../hooks/useAddToCart';

export default function Detail() {
	const { id } = useParams();
	const { products, loading, error } = useFetchProducts(`products/${id}`);
	const { addCartItem, addingToCart, addingError } = useAddToCart();
	// const navigation = useNavigation();
console.log(products)
	const handleAddToCart = async (productId) => {
		await addCartItem(productId);
		// navigation.refreshNavigation();
	};

	if (!products) {
		return <div>Product not found.</div>;
	}
	// Helper function to generate rating radio buttons with different background colors
	const getRatings = (name, star) => {
		const rates = [];

		for (let i = 1; i <= 5; i++) {
			rates.push(
				<input
					key={i}
					type='radio'
					name={`rating-${name}`}
					className={`mask mask-star ${[i]} ${
						i <= parseInt(star) && 'bg-orange-600'
					}`}
					checked={i === parseInt(star)}
					readOnly
				/>,
			);
		}
		return rates;
	};

	return (
		<div className='card  rounded-md bg-base-300 shadow-sm justify-center  p-10'>
			<Link className='btn-link w-fit' to='/products'>
				{'<<<<'}
			</Link>
			<div className='md:flex gap-10'>
				<div className='image '>
					<figure className='p-5 max-w-sm'>
						<img
							src={`../../backend/${products.image}`}
							alt='Shoes'
							className='rounded-lg w-full'
						/>
					</figure>
				</div>
				<div className='details'>
					<div className='card-body'>
						<h1 className='card-title font-bold text-2xl capitalize'>
							{products.name}
						</h1>
						<div className='flex justify-between w-fit'>
							<div className='rating  rating-sm flex items-center'>
								{getRatings(products.name, '3')}{' '}
								<span className='mx-4'>
									({5} Reviews)
								</span>
								{'|'}
							</div>
							<div
								className={`ml-4 ${
									products.availability
										? 'text-success'
										: 'text-error'
								}`}>
								{products.availability
									? 'in stock'
									: 'out of stock'}
							</div>
						</div>
						<div className='pricing '>
							<h5 className='text-lg '>
								₵ {products.price}
							</h5>
						</div>
						<h3>{products.description}</h3>
						<div className=' divider my-2' />
						<div className='properties  text-sm mb-2'>
							<div className='flex '>
								Color:
								<span
									className={`rounded-md border  py-0 px-5 mx-3 `}>
									{products.color}
								</span>
							</div>

							<div className='mt-2 capitalize rounded-md '>
								texture:{' '}
								<span className='ml-3 text-secondary'>
									{products.texture}
								</span>
							</div>

							<div className=' rounded-md mt-2'>
								length:{' '}
								<span className='ml-4'>
									{products.length}
								</span>
							</div>
						</div>
						<div className='card-actions btn-group '>
							<button
								className='btn btn-primary capitalize'
								onClick={() => handleAddToCart(id)}>
								add to cart
							</button>
							<Link
								to='/cart'
								className='btn btn-outline capitalize'>
								view cart
							</Link>
						</div>

						<div className='benefits   flexp-3 rounded-md flex-col text-xs mt-3'>
							<div className=' flex border p-3 rounded-md  bg-base-200 h-14'>
								<img src={delivery} />

								<div className='ml-2 text-black'>
									<h4 className=' font-semibold'>
										Free Delivery
									</h4>
									<p className='text-xs'>
										Enter your postal code for
										Delivery Availability
									</p>
								</div>
							</div>
							<div className='benefits flex border  p-3 rounded-md  bg-base-200 h-14'>
								<img src={returns} />

								<div className='ml-2 text-black'>
									<h4 className=' font-semibold'>
										Return Delivery
									</h4>
									<p className=''>
										Free 30 Days Delivery Returns.
										Details
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
