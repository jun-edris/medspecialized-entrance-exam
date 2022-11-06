import { useState, createContext } from 'react';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
	const userInfo = localStorage.getItem('userInfo');
	const expiresAt = localStorage.getItem('expiresAt');

	const [authState, setAuthState] = useState({
		token: null,
		expiresAt,
		userInfo: userInfo ? JSON.parse(userInfo) : {},
	});

	const setAuthInfo = ({ userInfo, expiresAt }) => {
		localStorage.setItem('userInfo', JSON.stringify(userInfo));
		localStorage.setItem('expiresAt', expiresAt);
		setAuthState({
			userInfo,
			expiresAt,
		});
	};

	const isAuthenticated = () =>
		new Date().getTime() / 1000 < authState.expiresAt;

	const isDefaultUser = () => authState.userInfo.default === true;
	const isCommonUser = () => authState.userInfo.default === false;

	return (
		<Provider
			value={{
				authState,
				setAuthState: (authInfo) => setAuthInfo(authInfo),
				isAuthenticated,
				isDefaultUser,
				isCommonUser,
			}}
		>
			{children}
		</Provider>
	);
};

export { AuthContext, AuthProvider };
