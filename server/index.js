// I am not using typescript for server side, because had no handy config for
// ts for node and nodemon works very slowly with ts
const express = require('express')

const app = express()
app.use('/', express.static(require('path').join(__dirname, '../docs')))

app.use(require('cors')())
app.use(require('body-parser').json())
app.use(require('body-parser').urlencoded({ extended: false }))

app.use('/api/memory', require('./memory.router'))
const mongoose = require('mongoose')
mongoose.connect('mongodb://mongo:27017')

const SERVER_PORT = 3002
mongoose.connection.on('connected', () => app.listen(SERVER_PORT, () => {
  console.info('App is listening port:', SERVER_PORT)
}))

