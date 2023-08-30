import React from 'react';
import { ProductList } from '../components/ProductList';
import useFetchProducts from '../hooks/useFetchProducts';

export default function Product() {

	const { products, loading, error } = useFetchProducts('products');
	
	return (
		<div className='relative font-serif text-sm flex flex-col items-center w-full'>
			<ProductList ProductsData={products} />
		</div>
	);
}
