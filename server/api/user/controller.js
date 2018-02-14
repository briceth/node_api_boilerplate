const User = require('./model')
const chalk = require('chalk')
const log = console.log

exports.get = async (req, res) => {
	const users = await User.find({}).then(users => res.json(users))
}

exports.post = async (req, res) => {
	const { firstname, lastname } = req.body

	log(req.body)

	const user = new User({
		firstname,
		lastname
	})

	user = await user.save().then(user => {
		log(chalk.green('user CREATED with Success!'))
		res.json(user)
	})
}

exports.getOne = async (req, res) => {
	const { id } = req.params
	const user = await User.findOne({ _id: id }).then(user => res.json(user))
}

exports.put = async (req, res) => {
	const { id } = req.params
	const { body } = req
	const user = await User.findOneAndUpdate(
		{ _id: id },
		{ body },
		{ new: true }
	).then(user => {
		log(chalk.green('user UPDATED with Success!'))
		res.json(user)
	})
}

exports.delete = async (req, res) => {
	const { id } = req.params

	const removed = await User.findOneAndRemove({ _id: id }).then(removed => {
		log(chalk.green('user DELETED with Success!'))
		res.json(removed)
	})
}
