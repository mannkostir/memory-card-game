const { Schema, model } = require('mongoose');

const schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  gameMode: { type: String },
  matchesAmount: { type: Number, required: true },
  passedTime: { type: Number, required: true },
  victory: { type: Boolean, required: true },
});

module.exports = model('Game', schema);
