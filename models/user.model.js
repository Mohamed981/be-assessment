const mongoose = require('mongoose')

const User = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		verificationCode: { type: String },
		isVerified:{type:Boolean,default:false}
	},
	{ collection: 'user' }
)

const model = mongoose.model('User', User)

module.exports = model