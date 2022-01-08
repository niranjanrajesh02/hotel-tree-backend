const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoomSchema = new Schema({
  name: String,
  hotel: { type: Schema.Types.ObjectId, ref: "Hotel" },
  disc_price: {
    type: Number,
    required: true,
    min: 0,
    max: 99999
  },
  full_price: {
    type: Number,
    required: true,
    min: 0,
    max: 99999
  },
  guests: {
    type: Number,
    required: true,
    min: 1,
    max: 4
  },
  image: String,
  remaining: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  breakfast: Number,
  view: {
    type: String,
    enum: ["sea", "pool", "park", "city", "town", "countryside", "lake", "river", "mountain"]
  }
})

module.exports = mongoose.model('Room', RoomSchema);