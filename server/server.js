const app = require('express')()
const mongoose = require('mongoose')
require('./middleware/appMiddleware')(app)
const api = require('./api/api')
const config = require('../config/config')
const auth = require('./auth/routes')
const helper = require('./utils/helpers')

mongoose.connect(config.db.url)
mongoose.Promise = require('bluebird') // Tell Mongoose to use BlueBird promises
mongoose.connection.on('error', err => {
	console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`)
})

// setup the api
app.use('/api', api)
app.use('/auth', auth)

// export the app for testing
module.exports = app
