const mongoose = require('mongoose')
const Schema = mongoose.Schema

// yes, not best place for model, but as for me, mongoose as wrapper here is too fat
const Memory = mongoose.model('memory', new Schema({ memory: Array }))

const router = require('express').Router()

router.get('/:id', async (req, res) => {
  // right, in mongo I had to store each record separately and make my "uniq"
  // action separately, but to speed up dev - made it like "key-value" where key
  // is unique user id, and value is memory array
  res.send(await Memory.findOne({ _id: req.params.id }))
})

router.post('/', async (req, res) => {
  res.send(await new Memory({ memory: req.body.memory }).save())
})

router.put('/:id', async (req, res) => {
  res.send(await Memory.updateOne({ _id: req.params.id }, { memory: req.body.memory }))
})

module.exports = router