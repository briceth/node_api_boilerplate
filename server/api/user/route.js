const router = require('express').Router()
const controller = require('./controller')
//const auth = require('../../auth/auth')
const asyncMiddleware = require('../../middleware/asyncMiddleware')

router
	.route('/')
	.get(asyncMiddleware(controller.get))
	.post(asyncMiddleware(controller.post))

router
	.route('/:id')
	.get(asyncMiddleware(controller.getOne))
	.put(asyncMiddleware(controller.put))
	.delete(asyncMiddleware(controller.delete))

module.exports = router
