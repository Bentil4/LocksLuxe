import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchProducts = (apiUrl) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		// Function to fetch products using Axios
		const fetchProducts = async () => {
			try {
				const response = await axios.get(
					'http://127.0.0.1:8000/' + apiUrl,
				);
				setProducts(response.data);
				setLoading(false);
			} catch (error) {
				setError(error);
				setLoading(false);
			}
		};

		// Call the fetchProducts function when the component mounts
		fetchProducts();
	}, []);

	return { products, loading, error };
};

export default useFetchProducts;
