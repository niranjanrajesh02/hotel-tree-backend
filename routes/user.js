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
  const { user_name, email, address, contact_no, user_id } = req.body;
  const newUser = new User({
    user_name,
    email,
    address,
    contact_no,
    user_id
  })
  try {
    const savedUser = await newUser.save();
    res.json(savedUser)
  } catch (err) {
    res.json({ error: err })

  }
})

router.post('/update-city', async (req, res) => {
  const { city_name, user_id } = req.body;
  try {
    const userToUpdate = await User.findById(user_id);
    userToUpdate.last_city = city_name;
    userToUpdate.save();
    res.json(userToUpdate)
  } catch (err) {
    res.json({ error: err })
  }
})

router.get('/verify/:user_id', async (req, res) => {
  try {
    const userFound = await User.findOne({ user_id: req.params.user_id })
    res.json(userFound)
  } catch (err) {
    res.json({ error: err })
  }
})

router.patch('/details', async (req, res) => {
  const { user_name, contact_no, address, email, user_id } = req.body;
  const foundUser = await User.findByIdAndUpdate(user_id, { user_name, contact_no, address, email }, { new: true });
  res.json(foundUser);
})

module.exports = router;