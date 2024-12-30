import {Routes, Route} from 'react-router-dom';

const AppRouter = () => {

	return (
		<Routes>
			<Route path="/prescriptions" />
			<Route path="/inventory" />
			<Route path="/orders" />
			<Route path="/*" />
		</Routes>
	);

}

export default AppRouter;