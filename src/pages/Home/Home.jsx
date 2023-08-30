import React from 'react';

import Sections from './components/Sections';
import Header from './components/Header';
export default function Home() {
	return (
		<div className='max-w-screen-2xl'>
			<div className='flex'>
				<Sections>
					<Header />
				</Sections>
			</div>
		</div>
	);
}
