import React, { useState } from 'react';
import axios from 'axios';
import useAlert from '../hooks/Confirm';
import { defaults } from 'autoprefixer';

export default function PaymentForm() {
	const [email, setEmail] = useState('');
	const [amount, setAmount] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	const { handleShowAlert, Alert } = useAlert();

	const handleSubmit = (e) => {
		e.preventDefault();

		// Check if any of the required fields is empty
		if (!email || !amount || !firstName || !lastName) {
			alert('Please fill in all the required fields.');
			return;
		}

		// Prepare the data to be sent in the request body
		const data = {
			email,
			amount: parseFloat(amount), // Convert amount to a number
			first_name: firstName,
			last_name: lastName,
		};

		var handler = PaystackPop.setup({
			key: 'pk_test_e9a874e1f8db72ffe0451c6ade70033e60890317', // Replace with your public key
			email: data.email,
			amount: data.amount * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
			currency: 'GHS', // Use GHS for Ghana Cedis or USD for US Dollars
			ref: '' + Math.floor(Math.random() * 1000000000 + 1), // Replace with a reference you generated
			callback: function (response) {
				//this happens after the payment is completed successfully
				var reference = response.reference;

				// Make the API call to your Django endpoint using axios
				axios.get(`http://127.0.0.1:8000/verify/${reference}`)
					.then((apiResponse) => {
						// Handle the success response from your Django API
						handleShowAlert(
							'Payment complete! Reference: ' +
								response.reference,
							'success',
						);

						// alert(
						// 	'reference' + apiResponse.data.reference,
						// 	'status: ' + apiResponse.data.status,
						// 	'amount: ' + apiResponse.data.amount,
						// );
					})
					.catch((error) => {
						// Handle the error response from your Django API
						handleShowAlert('Error: ' + error, 'error');
					});
			},
			onClose: function () {
				handleShowAlert(
					'Transaction was not completed, you closed the window.',
					'error',
				);
			},
		});
		handler.openIframe();
	};

	return (
		<>
			<form id='paymentForm' onSubmit={handleSubmit}>
				<div className='card rounded bg-base-300 shadow-sm'>
					<div className='card-body'>
						<div className='form-control w-full flex '>
							<label htmlFor='email'>Email Address </label>
							<input
								type='email'
								id='email-address'
								value={email}
								onChange={(e) =>
									setEmail(e.target.value)
								}
								required
								className='input input-bordered w-full'
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='amount'>Amount</label>
							<input
								type='number'
								id='amount'
								value={amount}
								onChange={(e) =>
									setAmount(e.target.value)
								}
								required
								className='input input-bordered w-full'
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='first-name'>
								First Name
							</label>
							<input
								type='text'
								id='first-name'
								value={firstName}
								onChange={(e) =>
									setFirstName(e.target.value)
								}
								className='input input-bordered w-full'
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='last-name'>Last Name</label>
							<input
								type='text'
								id='last-name'
								value={lastName}
								onChange={(e) =>
									setLastName(e.target.value)
								}
								className='input input-bordered w-full'
							/>
						</div>
					</div>
				</div>
				<div className='form-control card '>
					<button
						type='submit'
						className='btn btn-primary rounded-none'>
						Pay
					</button>
				</div>
			</form>
		</>
	);
}

// {
//   "status": true,
//   "message": "Verification successful",
//   "data": {
//     "id": 2009945086,
//     "domain": "test",
//     "status": "success",
//     "reference": "rd0bz6z2wu",
//     "amount": 20000,
//     "message": null,
//     "gateway_response": "Successful",
//     "paid_at": "2022-08-09T14:21:32.000Z",
//     "created_at": "2022-08-09T14:20:57.000Z",
//     "channel": "card",
//     "currency": "NGN",
//     "ip_address": "100.64.11.35",
//     "metadata": "",
//     "log": {
//       "start_time": 1660054888,
//       "time_spent": 4,
//       "attempts": 1,
//       "errors": 0,
//       "success": true,
//       "mobile": false,
//       "input": [],
//       "history": [
//         {
//           "type": "action",
//           "message": "Attempted to pay with card",
//           "time": 3
//         },
//         {
//           "type": "success",
//           "message": "Successfully paid with card",
//           "time": 4
//         }
//       ]
//     },
//     "fees": 100,
//     "fees_split": null,
//     "authorization": {
//       "authorization_code": "AUTH_ahisucjkru",
//       "bin": "408408",
//       "last4": "4081",
//       "exp_month": "12",
//       "exp_year": "2030",
//       "channel": "card",
//       "card_type": "visa ",
//       "bank": "TEST BANK",
//       "country_code": "NG",
//       "brand": "visa",
//       "reusable": true,
//       "signature": "SIG_yEXu7dLBeqG0kU7g95Ke",
//       "account_name": null
//     },
//     "customer": {
//       "id": 89929267,
//       "first_name": null,
//       "last_name": null,
//       "email": "hello@email.com",
//       "customer_code": "CUS_i5yosncbl8h2kvc",
//       "phone": null,
//       "metadata": null,
//       "risk_action": "default",
//       "international_format_phone": null
//     },
//     "plan": null,
//     "split": {},
//     "order_id": null,
//     "paidAt": "2022-08-09T14:21:32.000Z",
//     "createdAt": "2022-08-09T14:20:57.000Z",
//     "requested_amount": 20000,
//     "pos_transaction_data": null,
//     "source": null,
//     "fees_breakdown": null,
//     "transaction_date": "2022-08-09T14:20:57.000Z",
//     "plan_object": {},
//     "subaccount": {}
//   }
// }
