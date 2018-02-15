const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../../config/config')
const User = require('../api/user/model')
const sendEmail = require('../mailgun/mail')

exports.signUp = async (req, res) => {
	const { firstname, lastname, email, password } = req.body
	//on crypte le password
	const hashedPassword = bcrypt.hashSync(password, 8)

	const user = new User({
		firstname,
		lastname,
		password: hashedPassword,
		email,
		validated: false
	})

	if (user) {
		const newUser = await user.save()
		// créer un token
		const token = jwt.sign({ id: user._id }, config.secret.jwt, {
			expiresIn: 86400 // expires in 24 hours
		})
		//envoie du mail de validation du compte
		sendEmail(token, newUser.email)
		//on lui renvoie pour le mettre dans le localstorage
		res.status(200).send({ auth: true, token: token })
	}
}

exports.signIn = async (req, res) => {
	const { email, password } = req.body
	//trouver le user avec son email
	const user = await User.findOne({ email })
	//si pas de user trouvés
	if (!user) return res.status(404).send('No user found.')
	console.log('user', user)
	// comparer son password entré avec celui dans la db
	const isPasswordIsValid = await bcrypt.compare(password, user.password)
	//si ce n'est pas valide
	if (!isPasswordIsValid)
		return res.status(401).send({ auth: false, token: null })
	//sinon, lui renvoyer le token
	const token = jwt.sign({ id: user._id }, config.jwt.secret, {
		expiresIn: config.secret // expires in 24 hours
	})
	res.status(200).send({ auth: true, token: token })
}

exports.logOut = (req, res) => {
	res.status(200).send({ auth: false, token: null })
}
