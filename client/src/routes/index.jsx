import { useRoutes } from 'react-router-dom';

import DashboardRoutes from './DashboardRoute';
import AuthenticationRoutes from './AuthRoute';

// const Routes = () => {
// 	return useRoutes([AuthenticationRoutes, DashboardRoutes], '');
// };

// export default Routes;

export default function Routes() {
	return useRoutes([AuthenticationRoutes, DashboardRoutes]);
}
