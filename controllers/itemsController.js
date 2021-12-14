const express = require('express')
const app = express()
const Item = require('../models/itemsModel')
const methodOverride = require('method-override')
const itemsSeed = require('../models/itemsSeed')

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send(itemsSeed)
})

app.post('/', async (req, res) => {
  console.log(req.body)
  const item = await Item.create(req.body)
  res.send(item)
})

app.delete('/:id', (req, res) => {
  const item = await Item.findOneAndDelete({ _id: req.params.id })
  res.send(item)
})

app.put('/:id', async (req, res) => {
  const item = await Item.updateOne({ _id: req.params.id }, req.body, {
    new: true,
  })
  res.send(item)
})

app.get('/seed', async (req, res) => {
  try {
    const seedItems = await Item.create(itemsSeed)
    res.send(seedItems)
  } catch (err) {
    res.send(err.message)
  }
})

module.exports = app
