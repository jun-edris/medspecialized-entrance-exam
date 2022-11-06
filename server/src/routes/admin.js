const express = require('express');
const { body } = require('express-validator');
const {
	authValidation,
	requireDefault,
	attachUser,
} = require('../middlewares');
const { addUser, editUser, deleteUser } = require('./../controllers/admin');

const router = express.Router();

router.post(
	'/user',
	attachUser,
	requireDefault,
	body('email').isEmail(),
	body('password').isLength({ min: 5 }),
	authValidation,
	addUser
);

router.patch(
	'/user/:id',
	attachUser,
	requireDefault,
	body('email').isEmail(),
	authValidation,
	editUser
);

router.delete('/user/:id', attachUser, requireDefault, deleteUser);

module.exports = router;
