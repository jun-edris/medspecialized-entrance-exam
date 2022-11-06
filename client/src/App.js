import Routes from './routes';
import { AuthProvider } from './context/AuthContext';

const App = () => {
	return (
		<AuthProvider>
			<Routes />
		</AuthProvider>
	);
};

export default App;
