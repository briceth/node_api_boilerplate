// setup config first before anything by requiring it
const config = require('./config/config')
const app = require('./server/server')
const chalk = require('chalk')
const log = console.log

app.listen(config.port)
log(chalk.green('listening on http://localhost:' + config.port))
