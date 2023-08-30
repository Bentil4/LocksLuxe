import React, { useState } from 'react';
import axios from 'axios';
import Confirm from '../hooks/Confirm';
import { Navigate } from 'react-router-dom';
const OrderForm = ({ totalAmount }) => {
	const orderId = localStorage.getItem('orderId');

	const [showAlert, setShowAlert] = useState(false);
	const [alertType, setAlertType] = useState(false);
	const [alertMessage, setAlertMessage] = useState(false);

	const handleShowAlert = (type, message) => {
		setShowAlert(true);
		setAlertType(type);
		setAlertMessage(message);
	};

	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		email: '',
		address: '',
		city: '',
		country: '',
		payment_method: 'momo',
		payment_ref: '',
		order: '',
	});

	function generateTransactionReference(prefix, order_id) {
		const uniqueIdentifier = Math.random().toString(36).substring(2, 10); // Generate a random alphanumeric string

		return `${prefix}${uniqueIdentifier}-ORDER-ID${order_id}`;
	}

	// Check if any of the required fields is empty
	// if (!email || !amount || !firstName || !lastName) {
	// 	alert('Please fill in all the required fields.');
	// 	return;
	// }

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		window.my_modal_4.close();
		const getRef = generateTransactionReference('Ref');

		var handler = PaystackPop.setup({
			key: 'pk_test_e9a874e1f8db72ffe0451c6ade70033e60890317',
			email: formData.email,
			amount: totalAmount * 100,
			currency: 'DOLLAR',
			ref: getRef, //  reference  generated

			callback: function (response) {
				//this happens after the payment is completed successfully
				var reference = response.reference;

				setFormData((prevData) => ({
					...prevData,
					payment_ref: reference,
				}));
				console.log(formData.payment_ref);
				// Make the API call to your Django endpoint using axios
				axios.get(`http://127.0.0.1:8000/verify/${reference}`)
					.then((apiResponse) => {
						// on sucess

						handleShowAlert('success', apiResponse.data[2]);

						const url = `http://127.0.0.1:8000/orders/${orderId}/checkout/`;

						axios.post(url, {
							...formData,
							payment_ref: apiResponse.data[3].reference,
							order: localStorage.getItem('orderId'),
						})
							.then((response) => {
								console.log(response.data);
								// window.confirmPopUp.showModal();
								alert('order in process ');

								localStorage.removeItem(
									localStorage.getItem('orderId'),
								);
								window.location.replace(
									'http://127.0.0.1:8000/products',
								);
								window.location.reload();
							})
							.catch((error) => {
								// Handle errors
								console.error(error);
							});
					})
					.catch((error) => {
						// Handle the error response from your Django API
						handleShowAlert('Error: ' + error, 'error');
					});
			},
			onClose: function () {
				alert(
					'Transaction was not completed, you closed the window.',
				);
			},
		});
		handler.openIframe();
	};

	return (
		<dialog id='my_modal_4' className='modal'>
			{/* <Alert
				trigger={showAlert}
				type={alertType}
				message={alertMessage}
			/> */}

			<form
				method='dialog'
				onSubmit={handleSubmit}
				className='modal-box max-w-5xl p-8'>
				<h3 className='font-bold text-lg'>Billing Details!</h3>
				<div
					onClick={() => window.my_modal_4.close()}
					className='absolute btn btn-circle btn-xs btn-danger right-2 top-2'>
					x
				</div>
				<div className='flex justify-around mt-4 '>
					<div>
						<div className='flex gap-1 '>
							<div className='form-control w-full max-w-xl'>
								<label className='label'>
									<span className='label-text'>
										First Name
									</span>
								</label>
								<input
									type='text'
									placeholder='Type here'
									className='input input-bordered w-full max-w-xl'
									name='first_name'
									value={formData.first_name}
									onChange={handleChange}
								/>
							</div>

							<div className='form-control w-full max-w-xs'>
								<label className='label'>
									<span className='label-text'>
										Last Name
									</span>
								</label>
								<input
									type='text'
									placeholder='Type here'
									className='input input-bordered w-full max-w-xs'
									name='last_name'
									value={formData.last_name}
									onChange={handleChange}
								/>
							</div>
						</div>

						<div className='form-control w-full max-w-xl'>
							<label className='label'>
								<span className='label-text'>
									Email
								</span>
							</label>
							<input
								type='email'
								placeholder='Type here'
								className='input input-bordered w-full max-w-'
								name='email'
								value={formData.email}
								onChange={handleChange}
							/>
						</div>

						<div className='form-control w-full max-w-xl'>
							<label className='label'>
								<span className='label-text'>
									Address
								</span>
							</label>
							<input
								type='text'
								placeholder='Type here'
								className='input input-bordered w-full max-w-xl'
								name='address'
								value={formData.address}
								onChange={handleChange}
							/>
						</div>

						<div className='form-control w-full max-w-xl'>
							<label className='label'>
								<span className='label-text'>City</span>
							</label>
							<input
								type='text'
								placeholder='Type here'
								className='input input-bordered w-full max-w-xl'
								name='city'
								value={formData.city}
								onChange={handleChange}
							/>
						</div>

						<div className='form-control w-full max-w-xl'>
							<label className='label'>
								<span className='label-text'>City</span>
							</label>
							<input
								type='text'
								placeholder='Type here'
								className='input input-bordered w-full max-w-xl'
								name='country'
								value={formData.country}
								onChange={handleChange}
							/>
						</div>

						<button
							type='submit'
							className={'btn btn-success mt-4 '}>
							checkout now
						</button>

						<input
							type='hidden'
							name='total_amount'
							value={formData.total_amount}
							onChange={handleChange}
						/>
					</div>

					<div className='card w-96 bg-base-200 shadow-sm h-fit'>
						<div className='card-body'>
							<h2 className='card-title'>Cost summary</h2>
							<div className=''>
								<p>Total Amount: {totalAmount}</p>
								<p>shipping: 350</p>

								<div className='details mt-5 capitalize'>
									<h6 className='capitalize font-bold'>
										Details
									</h6>
									<p>
										full name:{' '}
										{formData.first_name +
											' ' +
											formData.last_name}
									</p>
									<p>email: {formData.email}</p>
									<p>Addres: {formData.address}</p>
									<p>City: {formData.city}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</dialog>
	);
};

export default OrderForm;
