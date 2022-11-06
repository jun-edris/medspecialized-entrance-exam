const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	default: {
		type: Boolean,
		default: false,
	},
	name: {
		type: String,
		required: true,
		trim: true,
		max: 50,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		index: true,
	},
	password: {
		type: String,
		required: true,
		min: 5,
		select: false,
	},
	status: {
		type: Boolean,
		required: true,
		default: false,
	},
	role: {
		type: String,
		required: true,
		enum: ['admin', 'trainee', 'trainer'],
		default: 'trainee',
	},
});

module.exports = mongoose.model('user', UserSchema);
