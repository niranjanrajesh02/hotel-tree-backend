const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  check_in: Date,
  check_out: Date,
  hotel: { type: Schema.Types.ObjectId, ref: "Hotel" },
  rooms: [{ type: Schema.Types.ObjectId, ref: "Room" }],
  total_paid: {
    type: Number,
    required: true,
    min: 0,
    max: 999999
  },
  date: Date
})

module.exports = mongoose.model('Booking', BookingSchema);