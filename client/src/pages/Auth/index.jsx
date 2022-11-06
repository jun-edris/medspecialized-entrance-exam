import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import publicFetch from '../../utils/fetch';
import './styles/login.css';

const Login = () => {
	const authContext = useContext(AuthContext);
	const history = useNavigate();
	const [creds, setCreds] = useState({ email: '', password: '' });

	const submitCreds = async (e) => {
		e.preventDefault();
		try {
			const { data } = await publicFetch.post(`/auth/signin`, creds);
			authContext.setAuthState(data);
		} catch (err) {
			console.log(err.response.data.message);
		}
	};

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setCreds({ ...creds, [name]: value });
	};

	useEffect(() => {
		const controller = new AbortController();

		if (!authContext.isAuthenticated()) {
			history('/', { replace: true });
		} else {
			history('/users', { replace: true });
		}

		return () => {
			controller.abort();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="login-container">
			<div className="img-side-container">
				<div className="img-side"></div>
			</div>

			<div className="login-form-container">
				<img
					src="/assets/LMCLogo.svg"
					alt="Learning Manegement Center"
					width={180}
				/>
				<h4>Welcome to LMC Admin App</h4>

				<button>
					<img src="/assets/google.svg" alt="Google" width={25} />
					Sign in with Google
				</button>

				<div className="login-form-divider">
					<div></div>
					<span>or Sign in with Email</span>
					<div></div>
				</div>
				<form action="" className="form" onSubmit={submitCreds}>
					<label htmlFor="email">E-mail</label>
					<input
						type="email"
						name="email"
						value={creds.email}
						onChange={handleChange}
						required
					/>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						value={creds.password}
						onChange={handleChange}
						required
					/>
					<span>Forgot Password?</span>
					<button type="submit">Login</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
