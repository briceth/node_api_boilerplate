const jwt = require('jsonwebtoken')
const config = require('../../config/config')

exports.verifyToken = async (req, res, next) => {
	var token = req.headers['x-access-token']

	if (!token)
		return res.status(401).send({ auth: false, message: 'No token provided.' })

	try {
		const payload = await jwt.verify(token, config.jwt.secret)
		console.log('payload', payload)
	} catch (e) {
		return res
			.status(500)
			.send({ auth: false, message: 'Failed to authenticate token.' })
	}
	next()
}
