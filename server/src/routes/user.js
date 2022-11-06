const express = require('express');
const { body } = require('express-validator');
const { authValidation } = require('../middlewares');
const { signin, user } = require('./../controllers/user');

const router = express.Router();

router.get('/users', user);
router.post(
	'/auth/signin',
	body('email').isEmail(),
	body('password').isLength({ min: 5 }),
	authValidation,
	signin
);

module.exports = router;
