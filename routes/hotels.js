const express = require('express')
const router = express.Router()
const Hotel = require('../models/Hotel')
const Review = require('../models/Review')
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

router.get('/', async (req, res) => {
  const { minPrice = 0, minRating = 0, amenities = null, sort = null, city = null } = req.query;
  const sortObj = handleQuerySort(sort);
  try {
    if (!amenities || amenities === []) {
      const filteredHotels = await Hotel.find({
        base_price: { $gte: minPrice },
        avg_rating: { $gte: minRating },
        city: city,
      }).sort(sortObj).populate('rooms');
      res.json(filteredHotels)
    }
    else {
      const filteredHotelsCollection = await Hotel.find({
        base_price: { $gte: minPrice },
        avg_rating: { $gte: minRating },
        tags: { $all: amenities },
        city: city,
      }).sort(sortObj).populate('rooms');
      res.json(filteredHotelsCollection)
    }
  } catch (err) {
    res.json({ message: err })
  }
})

router.get('/:hotel_id', async (req, res) => {
  try {
    const foundHotel = await Hotel.findById(req.params.hotel_id).populate('rooms').populate('reviews')
    res.json(foundHotel)
  } catch (err) {
    res.json({ error: err })
  }
})

// router.get('/', async (req, res) => {
//   try {
//     const foundHotels = await Hotel.find().populate('rooms');
//     res.json(foundHotels)
//   } catch (err) {
//     res.json({ error: err })
//   }
// })

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
function rating_result_finder(x) {
  if (x === 5) return "Excellent";
  else if (x >= 4.5) return "Very Good";
  else if (x >= 4) return "Good";
  else return "Fair"
}

router.post('/review', async (req, res) => {
  const { hotel_id, user_id, review_title, review_text, rating } = req.body
  try {
    const hotelToReview = await Hotel.findById(hotel_id);
    const userToReview = await User.findOne({ user_id })
    const reviewToCreate = await new Review({
      user: userToReview._id,
      hotel: hotelToReview._id,
      user_name: userToReview.user_name,
      review_title,
      review_text,
      rating,
      date: new Date
    })
    hotelToReview.reviews.push(reviewToCreate._id)

    await hotelToReview.save();
    await reviewToCreate.save();

    let sum = 0; let new_avg = 0;
    const hotelToUpdate = await Hotel.findById(hotel_id).populate('reviews')
    for (let r = 0; r < hotelToUpdate.reviews.length; r++) {
      console.log(hotelToUpdate.reviews[r]);
      sum += hotelToUpdate.reviews[r].rating
      console.log(sum);
    }
    new_avg = sum / hotelToUpdate.reviews.length
    console.log(new_avg);
    let new_rating_result = rating_result_finder(new_avg);
    console.log(new_rating_result)
    hotelToUpdate.avg_rating = new_avg;
    hotelToUpdate.rating_result = new_rating_result;
    hotelToUpdate.save();


    res.json(reviewToCreate);
  } catch (err) {
    res.json({ error: err })
  }
})

module.exports = router