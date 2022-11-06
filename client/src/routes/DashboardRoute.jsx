import { Navigate, Outlet } from 'react-router-dom';
import MainLayout from './../layout/MainLayout';
const { lazy, useContext } = require('react');

const { AuthContext } = require('../context/AuthContext');

const User = lazy(() => import('./../pages/User'));

const AuthorizedRoute = ({ children }) => {
	const authContext = useContext(AuthContext);

	if (authContext.isAuthenticated()) {
		return <Outlet />;
	}
	return <Navigate to="/" />;
};

const DashboardRoutes = {
	path: '/',
	element: <AuthorizedRoute />,
	children: [
		{
			path: '/',
			element: <MainLayout />,
			children: [
				{
					path: '/users',
					element: <User />,
				},
			],
		},
	],
};

export default DashboardRoutes;
