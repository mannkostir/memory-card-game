const { Schema, model } = require('mongoose');

const schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
});

module.exports = model('Highscore', schema);
