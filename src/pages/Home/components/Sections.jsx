import React from 'react';

export default function Sections({ children,  }) {
	return (
		<div className='min-h-[80vh] w-screen mb-5 b-indigo-400'>
			<div className='p-5 flex items-center bg-red500 h-full'>{children}</div>
		</div>
	);
}
