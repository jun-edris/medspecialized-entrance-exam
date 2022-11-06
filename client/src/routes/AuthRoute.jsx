import { useContext, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import CommonLayout from '../layout/CommonLayout';

const Login = lazy(() => import('../pages/Auth'));

const LoginRoute = ({ children, ...rest }) => {
	const authContext = useContext(AuthContext);

	if (!authContext.isAuthenticated()) {
		return <CommonLayout>{children}</CommonLayout>;
	}
	return <Navigate to="/users" />;
};

const AuthenticationRoutes = {
	path: '/',
	element: <LoginRoute />,
	children: [
		{
			path: '/',
			element: <CommonLayout />,
			children: [
				{
					path: '/',
					element: <Login />,
				},
			],
		},
	],
};

export default AuthenticationRoutes;
// path: '/',
// element: <CommonLayout />,
// children: [
// 	{
// 		path: '/',
// 		element: <LoginRoute />,
// 		children: [
// 			{
// 				path: '/',
// 				element: <Login />,
// 			},
// 		],
// 	},
// ],
