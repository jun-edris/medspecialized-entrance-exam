const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const hashPassword = async (password) => {
	return new Promise((resolve, reject) => {
		// Generate a salt at level 12 strength
		bcrypt.genSalt(12, (err, salt) => {
			if (err) {
				reject(err);
			}
			bcrypt.hash(password, salt, (err, hash) => {
				if (err) {
					reject(err);
				}
				resolve(hash);
			});
		});
	});
};

const verifyPassword = (passwordAttempt, hashedPassword) => {
	return bcrypt.compare(passwordAttempt, hashedPassword);
};

const createToken = (user) => {
	// Sign the JWT
	if (!user.role) {
		throw new Error('No user role specified');
	}
	if (!user._id) {
		throw new Error('No user id specified');
	}

	return jwt.sign(
		{
			sub: user._id,
			email: user.email,
			role: user.role,
			default: user.default,
			firstName: user.firstName,
			lastName: user.lastName,
			iss: 'api.medspecialized',
			aud: 'api.medspecialized',
		},
		'medspecialized',
		{ algorithm: 'HS256', expiresIn: '5h' }
	);
};

module.exports = {
	createToken,
	hashPassword,
	verifyPassword,
};
