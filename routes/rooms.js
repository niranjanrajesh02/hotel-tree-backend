const express = require('express')
const router = express.Router()
const Hotel = require('../models/Hotel')
const Room = require('../models/Room')
const User = require('../models/User')

router.get('/', async (req, res) => {
  try {
    const foundRooms = await Room.find().populate("hotel");
    res.json(foundRooms)
  } catch (err) {
    res.json({ error: err })
  }
})

router.get('/:hotel_id', async (req, res) => {
  try {
    const foundRooms = await Room.find({ hotel: req.params.hotel_id }).populate("hotel");
    res.json(foundRooms)
  } catch (err) {
    res.json({ error: err })
  }
})

router.post('/', async (req, res) => {
  const { name, hotel_id, full_price, disc_price, guests, image, breakfast, remaining, view } = req.body;
  const roomToSave = new Room({
    name,
    hotel: hotel_id,
    full_price,
    disc_price,
    guests,
    image,
    remaining,
    breakfast,
    view
  })
  try {
    const savedRoom = await roomToSave.save();
    let hotelToUpdate = await Hotel.findById(hotel_id);
    hotelToUpdate.rooms.push(savedRoom._id);
    await hotelToUpdate.save();
    let hotelToPriceChange = await Hotel.findById(hotel_id).populate('rooms');
    let min_price = 0;
    if (!hotelToPriceChange.base_price) {
      hotelToPriceChange.base_price = 0;
    }

    for (let r = 0; r < hotelToPriceChange.rooms.length; r++) {
      if (r === 0) {
        min_price = hotelToPriceChange.rooms[r].disc_price;
      } else {
        if (min_price > hotelToPriceChange.rooms[r].disc_price) {
          min_price = hotelToPriceChange.rooms[r].disc_price
        }
      }
    }
    console.log(hotelToPriceChange.rooms);
    console.log(hotelToPriceChange);
    console.log(min_price);
    hotelToPriceChange.base_price = min_price;
    await hotelToPriceChange.save();
    res.json(savedRoom)
  } catch (err) {
    res.json({ error: err })
  }
})




module.exports = router