const mongoose = require('mongoose');
const { Schema } = mongoose;

const SavedListSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  hotels: [{ type: Schema.Types.ObjectId, ref: "Hotel" }],
})

module.exports = mongoose.model('SavedList', SavedListSchema);