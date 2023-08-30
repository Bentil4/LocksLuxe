

import { useState } from 'react';
import axios from 'axios';

const useAddToCart = () => {
  const [addingToCart, setAddingToCart] = useState(false);
  const [addingError, setAddingError] = useState(null);

  const addCartItem = async (productId) => {
		setAddingToCart(true);
		setAddingError(null);

		const orderId = localStorage.getItem('orderId');
	

		try {
			if (orderId) {
				// If orderId exists, send a request to add to an existing order
				const url = `http://127.0.0.1:8000/orders/${orderId}/items/add/`;
				const requestData = {
					product: productId,
					order: orderId,
				};

				axios.post(url, requestData) // Use Axios.post instead of fetch
					.then((response) => {
						console.log(response.data.message);
						// window.location.reload();
						 // Log the response data to check its content
					})
					.catch((error) => {
						// Handle errors
						console.error(error);
					});
			} else {
				// If orderId doesn't exist, create a new order with items
				const url = `http://127.0.0.1:8000/orders/`;
				const requestData = { order_item_id: productId };

				axios.post(url, requestData) // Use Axios.post instead of fetch
					.then((response) => {
						// console.log(response.data); // Log the response data to check its content

						// Store the newly created orderId in local storage
						localStorage.setItem(
							'orderId',
							response.data.order_id,
						);
					})
					.catch((error) => {
						// Handle errors
						console.error(error);
					});
			}

			// Handle success, e.g., show a success message
		} catch (error) {
			setAddingError(error.message);
		} finally {
			setAddingToCart(false);
		}
  };

  return { addCartItem, addingToCart, addingError };
};

export default useAddToCart;
