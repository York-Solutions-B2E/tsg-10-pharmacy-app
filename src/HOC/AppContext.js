import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const AppContext = createContext();
export const useAppContext = () => {
	return useContext(AppContext);
};

const AppProvider = ({ children }) => {
	const navigate = useNavigate();

	return (
		<AppContext.Provider value={{ navigate }}>{children}</AppContext.Provider>
	);
};

export default AppProvider;
