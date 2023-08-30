import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useDeleteItem from '../hooks/useDeleteItem';
import axios from 'axios';
import { useNavigation } from '../contexts/NavigationContext';
import del from '../assets/delete.svg';

import { useUpdateOrderItem } from '../hooks/useUpdateOrderItem';
import OrderForm from './OrderForm';
import Alert from './Alert';
const CartItems = () => {
	const orderId = localStorage.getItem('orderId');
	const { quantity, updateOrderItem } = useUpdateOrderItem();
	const navigation = useNavigation();
	const { deleteItem } = useDeleteItem();
	const [listOfItem, setListOfItem] = useState([]);
	let subtotal = 0;
	const handleQuantityChange = async (itemId, newQuantity, productId) => {
		try {
			await updateOrderItem(orderId, itemId, newQuantity, productId);
			// Refresh
			fetchOrderItems();
		} catch (error) {
			console.error('Error updating order item:', error);
		}
	};

	// Fetch order items associated with the orderId
	const fetchOrderItems = async () => {
		try {
			const response = await axios.get(
				`http://127.0.0.1:8000/orders/${orderId}/items/list/`,
			);
			const orderItems = response.data;
			const fetchedItems = [];

			for (let i = 0; i < orderItems.length; i++) {
				const productId = orderItems[i].product;
				const productDetailsResponse = await axios.get(
					`http://127.0.0.1:8000/products/${productId}`,
				);
				const productDetails = productDetailsResponse.data;
				fetchedItems.push({
					...orderItems[i],
					productDetails,
				});
			}

			setListOfItem(fetchedItems);
		} catch (error) {
			console.error('Error fetching order items:', error);
		}
	};

	const handleDeleteOrder = async (order_item_id) => {
		await deleteItem(orderId, order_item_id);
		fetchOrderItems();
		navigation.refreshNavigation();
	};
	useEffect(() => {
		fetchOrderItems();
		navigation.refreshNavigation();
	}, []);

	// console.log(listOfItem);
	return (
		<div className='overflow-y-auto md:flex'>
			<table className='table table-zebra'>
				{/* head */}
				<thead className='bg-base-content text-base-100 '>
					<tr>
						<th>Product</th>
						<th>Price</th>
						<th>Qty</th>
						<th>Subtotal</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{listOfItem.map((item) => (
						<tr key={item.id} className='group hover:bg-opacity-30'>
							<td className='hidden'>
								{
									(subtotal +=
										item.quantity *
										item.productDetails.price)
								}
							</td>
							<td className='flex items-center align-middle'>
								<div className='flex items-center space-x-3 w-52'>
									<div className='avatar'>
										<div className='mask mask-squircle w-12 h-12'>
											<img
												src={`../../backend/${item.productDetails.image}`}
												alt='Avatar Tailwind CSS Component'
											/>
										</div>
									</div>
									<div>
										<div className='font-bold flex-nowrap'>
											{
												item.productDetails
													.name
											}
										</div>
									</div>
								</div>
							</td>
							<td>{item.productDetails.price}</td>
							<td>
								<input
									type='number'
									value={item.quantity}
									onChange={(e) =>
										handleQuantityChange(
											item.id,
											e.target.value,
											item.product,
										)
									}
								/>
							</td>
							<td>
								{Math.round(
									item.quantity *
										item.productDetails.price,
								)}
							</td>

							<th className='  flex w-28 '>
								<div className='hidden group-hover:flex gap-3'>
									<img
										className='cursor-pointer  text'
										src={del}
										onClick={() =>
											handleDeleteOrder(
												item.id,
											)
										}
									/>
								</div>
							</th>
						</tr>
					))}
				</tbody>
			</table>
			<div className='mt-6 ml-3 h-full rounded-lg border bg-base-content  p-6 shadow-md md:mt-0 md:w-1/3'>
				{/* Subtotal, Shipping, and Total information */}
				{/* Replace with your own calculations */}
				<p className='text-base-200'>
					Subtotal: Ghs {Math.round(subtotal)}
				</p>

				<hr className='my-4' />

				<OrderForm totalAmount={Math.round(subtotal)} />

				<button
					className='btn w-full'
					onClick={() => window.my_modal_4.showModal()}>
					order
				</button>
			</div>
		</div>
	);
};

export default CartItems;
