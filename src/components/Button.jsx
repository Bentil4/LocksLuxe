import React from 'react';

export default function Button({ value, style, handleClick }) {
	return (
		<button
			onClick={handleClick}
			className={`btn btn-${style} capitalize btn-sm`}>
			{value}
		</button>
	);
}
