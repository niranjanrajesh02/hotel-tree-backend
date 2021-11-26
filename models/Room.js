const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoomSchema = new Schema({
  name: String,
  hotel: { type: Schema.Types.ObjectId, ref: "Hotel" },
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 99999
  },
  occupants: {
    type: Number,
    required: true,
    min: 1,
    max: 4
  },
  images: [String],
  available: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  breakfast: Boolean,
  view: {
    type: String,
    enum: ["sea", "park", "city", "town", "countryside", "lake", "river", "mountain"]
  }
})

module.exports = mongoose.model('Room', RoomSchema);