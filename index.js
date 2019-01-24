const express = require('express')
const bodyParser = require('body-parser')
const store = require('./store')
const app = express()

app.use(express.static('public'))
app.use(bodyParser.json())

app.post('/createCity', (req, res) => {
  store
    .createCity({
      name: req.body.name,
      postal_code: req.body.postal,
      province_id: req.body.provinceId
    })
    .then(() => res.sendStatus(200))
})

app.get('/getProvinces', (req, res) => {
  var provinces = store.getProvinces()

  //console.log( provinces )
  res.json(provinces)
})

app.post('/createCustomer', (req, res) => {
  store
    .createCustomer({
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      docNumber: req.body.docNumber,
      cuit: req.body.cuit,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      cityId: req.body.cityId
    })
    .then(() => res.sendStatus(200))
})

app.post('/login', (req, res) => {
  store
    .authenticate({
      username: req.body.username,
      password: req.body.password
    })
    .then(({success}) => {
      if (success) res.sendStatus(200)
      else res.sendStatus(401)
    })
})

app.listen(7555, () => {
  console.log('Server running on http://localhost:7555')
})
