const router = require('express').Router()

router.use('/users', require('./user/route'))

// router.route.get('*', (req, res) => {
// 	res.status(404).send("Cette page n'existe pas !")
// })

module.exports = router
