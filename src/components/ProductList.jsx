import React, { useState } from 'react';
import Card from './Card';

export function ProductList({ ProductsData }) {
	// State to hold the search term entered in the input field
	const [searchTerm, setSearchTerm] = useState('');

	// Event handler for updating the search term state
	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
	};

	// Filter the Products based on the search term
	const filteredProducts = ProductsData.filter((Product) =>
		Product.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	

	return (
		<>
			{/* Input field for searching Products */}
			<div className='form-control w-full flex items-center justify-center'>
				<input
					type='text'
					value={searchTerm}
					onChange={handleSearch}
					placeholder='Search'
					className='input max-w-[30rem] input-bordered w-full'
				/>
			</div>

			{/* Display the filtered Products in a grid layout */}
			<div className='justify-center grid px-5 lg:grid-cols-4 max-w-screen-xl md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4'>
				{filteredProducts.length === 0 ? (
					// If no Products match the search term, display a message
					<div className='w-full left-0 flex justify-center absolute'>
						<p className='font-semibold text-2xl capitalize'>
							item not found.
						</p>
					</div>
				) : (
					// Otherwise, map through the filtered Products and render the Card component
					filteredProducts.map((Product) => (
						<Card
							key={Product.id}
							id={Product.id}
							name={Product.name}
							price={Product.price}
							description={Product.description}
							rating={Product.rating}
							image={Product.image}
							availability={Product.availability}
						/>
					))
				)}
			</div>
		</>
	);
}
