const mongoose = require('mongoose');
const { Schema } = mongoose;

const HotelSchema = new Schema({
  name: String,
  description: String,
  rooms: [{ type: Schema.Types.ObjectId, ref: "Room" }],
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  avg_rating: { type: Number, min: 0, max: 5 },
  rating_result: {
    type: String,
    enum: ["Perfect", "Excellent", "Very Good", "Good", "Satisfactory"]
  },
  images: [String],
  saved: Number,
  city: String,
  addresss: String,
  short_address: String,
  distance_center: Number,
  base_price: Number,
  tags: [{
    type: String,
    enum: ["pool", "bar", "room service", "free wifi", "parking",
      "gym", "pets", "restaurant"]
  }]
})

module.exports = mongoose.model('Hotel', HotelSchema);