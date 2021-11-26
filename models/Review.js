const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReviewSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: {
    type: Date,
    default: Date.now()
  },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
  reviewTitle: {
    type: String,
    required: true
  },
  reviewText: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  verified: Boolean
})

module.exports = mongoose.model('Review', ReviewSchema);