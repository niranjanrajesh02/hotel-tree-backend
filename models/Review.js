const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReviewSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  user_name: String,
  date: {
    type: Date,
    default: Date.now()
  },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
  review_title: {
    type: String,
    required: true
  },
  review_text: {
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