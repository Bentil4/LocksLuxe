import { useState } from 'react';
import axios from 'axios';

const useDeleteItem = () => {
	const [itemDeleting, setDeleting] = useState(false);
	const [itemDeleteError, setDeleteError] = useState(null);

	const deleteItem = async (order_id, order_item_id) => {
		setDeleting(true);
		try {
			await axios.delete(
				`http://127.0.0.1:8000/orders/${order_id}/items/${order_item_id}/delete/`,
			);
			setDeleting(false);

			return order_item_id;
		} catch (error) {
			setDeleting(false);
			setDeleteError(error);
		}
	};

	return { deleteItem, itemDeleting, itemDeleteError };
};

export default useDeleteItem;
