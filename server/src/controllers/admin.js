const express = require('express');
const cors = require('cors');
const User = require('./../models/user');
const { hashPassword } = require('../utils/utils');

const app = express();
app.use(
	cors({
		optionsSuccessStatus: 200,
		credentials: true,
	})
);

const emailRegex =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const nameRegex = /\w+|\.\s|[!"#€%&/()=?`´^¨*'-_;:.,]/g;

exports.addUser = async (req, res) => {
	try {
		const { email, name, role, status, password } = req.body;

		if (!email.match(emailRegex)) {
			return res.status(400).json({ message: 'Invalid Email!' });
		}

		if (!name.match(nameRegex)) {
			return res
				.status(400)
				.json({ message: 'Name only allows letters, space and period!' });
		}
		if (password.length < 5) {
			return res
				.status(400)
				.json({ message: 'Please add more characters for the password!' });
		}

		const existingEmail = await User.findOne({
			email,
		});
		const existingName = await User.findOne({
			name,
		});

		if (existingEmail) {
			return res.status(400).json({ message: 'Email already exist!' });
		}
		if (existingName) {
			return res.status(400).json({ message: 'Name already registered!' });
		}

		const hashedPassword = await hashPassword(password);
		const userData = {
			name,
			email,
			password: hashedPassword,
			status,
			role,
		};

		const newUser = new User(userData);
		const savedUser = await newUser.save();
		if (savedUser) {
			return res.status(201).json({
				message: 'Successfully added a new user!',
			});
		}
	} catch (err) {
		res.status(400).json({ message: 'Something went wrong!' });
	}
};

exports.editUser = async (req, res) => {
	try {
		const { email, name, status, role, password } = req.body;

		if (!email.match(emailRegex)) {
			return res.status(400).json({ message: 'Invalid Email!' });
		}

		if (!name.match(nameRegex)) {
			return res
				.status(400)
				.json({ message: 'Name only allows letters, space and period!' });
		}
		if (password.length < 5) {
			return res
				.status(400)
				.json({ message: 'Please add more characters for the password!' });
		}

		const existingEmail = await User.findOne({
			email,
		});
		const existingName = await User.findOne({
			name,
		});

		if (existingEmail) {
			return res.status(400).json({ message: 'Email already exist!' });
		}

		if (existingName) {
			console.log(existingName);
			return res.status(400).json({ message: 'Name already registered!' });
		}

		const hashedPassword = await hashPassword(password);
		const userData = {
			name,
			email,
			password: hashedPassword,
			status,
			role,
		};

		await User.findByIdAndUpdate(req.params.id, userData);

		return res.status(200).json({
			message: 'Successfully updated a user!',
		});
	} catch (err) {
		res.status(400).json({ message: 'Something went wrong!' });
	}
};

exports.deleteUser = async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);

		return res.status(200).send({
			message: 'A user is successfully deleted!',
		});
	} catch (err) {
		res.status(400).json({
			message: 'Something went wrong.',
		});
	}
};
