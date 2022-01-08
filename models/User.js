const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  user_name: String,
  email: String,
  bookings: [{ type: Object }],
  saved: [{ type: Object }],
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  contact_no: Number,
  address: String
})

module.exports = mongoose.model('User', UserSchema);