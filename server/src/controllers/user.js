const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwtDecode = require('jwt-decode');
const User = require('./../models/user');
const { verifyPassword, createToken } = require('./../utils/utils');

const app = express();
app.use(cookieParser());
app.use(
	cors({
		optionsSuccessStatus: 200,
		credentials: true,
	})
);

exports.user = async (req, res) => {
	try {
		const users = await User.find({ default: false }).select(
			'_id name email status role'
		);

		return res.status(200).json({ users });
	} catch (err) {
		res.status(400).json({ message: err });
	}
};

exports.signin = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({
			email,
		})
			.select('+password')
			.lean();

		if (!user) {
			return res.status(400).json({ message: 'Incorrect email/password.' });
		}

		const passwordValid = await verifyPassword(password, user?.password);

		if (passwordValid) {
			const { password, ...rest } = user;
			const userInfo = Object.assign({}, { ...rest });

			const token = createToken(userInfo);

			const decodedToken = jwtDecode(token);
			const expiresAt = decodedToken.exp;

			res.cookie('token', token, {
				httpOnly: true,
				secure: true,
			});

			return res.status(200).json({
				message: 'Authentication successful!',
				token,
				userInfo,
				expiresAt,
			});
		}
		return res.status(400).json({
			message: 'Wrong email or password.',
		});
	} catch (err) {
		res.status(400).json({ message: 'Something went wrong!' });
	}
};
