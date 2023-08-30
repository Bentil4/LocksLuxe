import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function BaseLayout() {
	return (
		<div>
			<NavBar />
			<main>
				<Outlet />
			</main>
		</div>
	);
}
