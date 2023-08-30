// useUpdateOrderItem.js
import { useState } from 'react';
import axios from 'axios';

export const useUpdateOrderItem = () => {
	const [quantity, setQuantity] = useState(0); // Initialize with 0

	const updateOrderItem = async (orderId, itemId, newData, productID) => {
		try {
			const response = await axios.put(
				`http://127.0.0.1:8000/orders/${orderId}/items/${itemId}/edit/`,
				// newData,
				{
					quantity: newData,
					order: orderId,
					product: productID,
				},
			);
			setQuantity(response.data.quantity);
		} catch (error) {
			throw error;
		}
	};

	return { quantity, updateOrderItem };
};
