const mongoose = require('mongoose')
const User = require('./user')
const chalk = require('chalk')
const faker = require('faker')
const log = console.log

mongoose.connect('mongodb://localhost/airbnb-dev')

const deleteUsers = () => {
	User.remove({})
		.then(log(chalk.green('deleting the database')))
		.catch(error => log(chalk.red(error)))
}

const seedUsers = () => {
	for (let i = 0; i < 5; i++) {
		const user = new User({
			firstname: faker.name.firstName(),
			lastname: faker.name.lastName()
		})
		user
			.save()
			.then(user => log(chalk.green('success'), user))
			.catch(error => log(chalk.red(error)))
	}
}

deleteUsers()
	.then(() => seedUsers())
	.catch(error => log(chalk.red(error)))
