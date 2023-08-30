// NavigationContext.js
import React, { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export const useNavigation = () => {
	return useContext(NavigationContext);
};

export const NavigationProvider = ({ children }) => {
	const [navigationKey, setNavigationKey] = useState(0);

	const refreshNavigation = () => {
		setNavigationKey((prevKey) => prevKey + 1);
	};

	return (
		<NavigationContext.Provider value={{ refreshNavigation }}>
			{children}
		</NavigationContext.Provider>
	);
};
