const express = require('express')
const router = express.Router()
const Hotel = require('../models/Hotel')
const Room = require('../models/Room')
const User = require('../models/User')

const handleQuerySort = (query) => {
  try {
    // convert the string to look like json object
    // example "id: -1, name: 1" to "{ "id": -1, "name": 1 }"
    const toJSONString = ("{" + query + "}").replace(/(\w+:)|(\w+ :)/g, (matched => {
      return '"' + matched.substring(0, matched.length - 1) + '":';
    }));
    return JSON.parse(toJSONString);
  } catch (err) {
    return JSON.parse("{}"); // parse empty json if the clients input wrong query format
  }
}

router.get('/sort', async (req, res) => {
  const { minPrice = 0, minRating = 0, amenities = null, sort = null } = req.query;
  const sortObj = handleQuerySort(sort);
  try {
    if (!amenities || amenities === []) {
      const filteredHotels = await Hotel.find({
        base_price: { $gte: minPrice },
        avg_rating: { $gte: minRating }
      }).sort(sortObj).populate('rooms');
      res.json(filteredHotels)
    }
    else {
      const filteredHotelsCollection = await Hotel.find({
        price: { $lte: maxPrice, $gte: minPrice },
        avg_rating: { $gte: minStars },
        tags: { $all: amenities }
      }).sort(sortObj).populate('rooms');
      res.json(filteredHotelsCollection)
    }
  } catch (err) {
    res.json({ message: err })
  }
})

router.get('/', async (req, res) => {
  try {
    const foundHotels = await Hotel.find().populate('rooms');
    res.json(foundHotels)
  } catch (err) {
    res.json({ error: err })
  }
})

router.post('/', async (req, res) => {
  const { name, description, images, distance_center, city, short_address, address, tags } = req.body;
  const hotelToCreate = new Hotel({
    name,
    description,
    images,
    city,
    address,
    short_address,
    distance_center,
    tags,
    avg_rating: 0,
  })
  try {
    const savedHotel = await hotelToCreate.save();
    res.json(savedHotel)
  } catch (err) {
    res.json({ error: err })
  }
})

router.post('/save', async (req, res) => {
  const { hotel_id, user_id } = req.body;
  try {
    let hotelToSave = await Hotel.findById(hotel_id);
    let userToSave = await User.findById(user_id)
    let newSavedHotel = {
      hotel_name: hotelToSave.name,
      city: hotelToSave.city,
      image: hotelToSave.images[0]
    }

    userToSave.saved.push(newSavedHotel);
    userToSave.save();
    if (hotelToSave.saved) {
      hotelToSave.saved += 1;
    } else {
      hotelToSave.saved = 1;
    }
    hotelToSave.save();
    res.json({ newSavedHotel })
    // console.log(newSavedHotel);
  } catch (err) {
    res.json({ error: err })
  }
})

router.post('/book', async (req, res) => {
  const { room_id, user_id, rooms } = req.body;
  try {
    let roomToBook = await Room.findById(room_id).populate("hotel");
    let userToBook = await User.findById(user_id)
    const newBooking = {
      hotel_name: roomToBook.hotel.name,
      room_name: roomToBook.name,
      rooms,
      total_cost: rooms * roomToBook.disc_price,
      city: roomToBook.hotel.city,
      image: roomToBook.image
    }

    userToBook.bookings.push(newBooking);
    userToBook.save();
    roomToBook.remaining -= 1;
    (roomToBook.remaining < 0) ? roomToBook.remaining = 0 : null;
    roomToBook.save();
    res.json(userToBook)
  } catch (err) {
    res.json({ error: err })
  }
})

router.get('/recommended/:city', async (req, res) => {
  try {
    const cityHotels = await Hotel.find({ city: req.params.city }).limit(4);
    console.log(cityHotels);
  } catch (err) {
    res.json({ error: err })
  }
})


module.exports = router