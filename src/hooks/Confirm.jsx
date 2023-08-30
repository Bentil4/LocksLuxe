import React from 'react';
import sucess from '../assets/sucess.svg';
import { Navigate } from 'react-router-dom';

export default function Confirm() {
	return (
		<div>
			{/* Open the modal using ID.showModal() method */}
			<button
				className='btn'
				onClick={() => window.confirmPopUp.showModal()}>
				open modal
			</button>
			<dialog
				id='confirmPopUp'
				className='modal modal-bottom sm:modal-middle '>
				<form method='dialog' className='modal-box'>
					<div className='flex flex-col justify-center items-center'>
						<img src={sucess} className='w-40 fill-success' />
						<p className='font-extrabold capitalize text-2xl'>
							your order is on the ways
						</p>
					</div>
					<div className='modal-action'>
						{/* if there is a button in form, it will close the modal */}
						<button
							className='btn'
							onClick={() => Navigate({ to: '/product' })}>
							Close
						</button>
					</div>
				</form>
			</dialog>
		</div>
	);
}
