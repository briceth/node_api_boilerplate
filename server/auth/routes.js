const express = require('express')
const router = express.Router()
const controller = require('./controller')
const asyncMiddleware = require('../middleware/asyncMiddleware')

router.post('/sign_up', asyncMiddleware(controller.signUp))
router.post('/sign_in', asyncMiddleware(controller.signIn))
router.get('/log_out', controller.logOut)

module.exports = router
