const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
	firstname: {
		type: String,
		required: [true, 'un firstname est requis']
	},

	lastname: {
		type: String,
		required: [true, 'un lastname est requis']
	}
})

module.exports = mongoose.model('User', userSchema)
