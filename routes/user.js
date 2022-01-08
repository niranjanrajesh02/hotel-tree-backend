const express = require('express')
const router = express.Router()
const Hotel = require('../models/Hotel')
const Room = require('../models/Room')
const User = require('../models/User')

router.get('/', async (req, res) => {
  try {
    const foundUsers = await User.find();
    res.json(foundUsers)
  } catch (err) {
    res.json({ error: err })
  }
})

router.post('/', async (req, res) => {
  const { user_name, email, address, contact_no } = req.body;
  const newUser = new User({
    user_name,
    email,
    address,
    contact_no
  })
  try {
    const savedUser = await newUser.save();
    res.json(savedUser)
  } catch (err) {
    res.json({ error: err })

  }
})

module.exports = router;