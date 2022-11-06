const express = require('express');
const cors = require('cors');
const { expressjwt: jwt } = require('express-jwt');
const { validationResult } = require('express-validator');
const jwtDecode = require('jwt-decode');
const app = express();
app.use(cors());

exports.attachUser = (req, res, next) => {
	const token = req.cookies.token;

	if (!token) {
		return res.status(401).json({ message: 'Authentication Invalid' });
	}

	const decodedToken = jwtDecode(token);

	if (!decodedToken) {
		return res
			.status(401)
			.json({ message: 'There was a problem in authorizing the request' });
	} else {
		req.user = decodedToken;
		next();
	}
};

exports.requireDefault = (req, res, next) => {
	if (!req.user) {
		return res.status(401).json({
			message: 'There was a problem authorizing the request',
		});
	}
	if (!req.user.default) {
		console.log('Not default');
		return res.status(403).json({ message: 'Role not permitted' });
	}
	next();
};

exports.authValidation = (req, res, next) => {
	const errors = validationResult(req.body);
	if (!errors.isEmpty()) {
		console.log(errors);
		return res.status(400).json({ errors: errors });
	} else {
		return next();
	}
};

exports.checkJwt = jwt({
	secret: 'medspecialized',
	algorithms: ['HS256'],
	issuer: 'api.medspecialized',
	audience: 'api.medspecialized',
	getToken: (req) => req.cookies.token,
});
