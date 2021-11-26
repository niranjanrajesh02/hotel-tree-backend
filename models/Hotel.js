const mongoose = require('mongoose');
const { Schema } = mongoose;

const HotelSchema = new Schema({
  name: String,
  description: String,
  rooms: [{ type: Schema.Types.ObjectId, ref: "Room" }],
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  avg_rating: { type: Number, min: 0, max: 5 },
  images: [String],
  saved: Number,
  location: String,
  addresss: String,
  tags: [{
    type: String,
    enum: ["luxury", "resort", "budget", "pool", "bar", "room service", "free wifi", "parking", "gym", "pets", "restaurant"]
  }]
})

module.exports = mongoose.model('Hotel', HotelSchema);