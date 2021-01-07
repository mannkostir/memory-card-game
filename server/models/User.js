import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  // _id: { type: Schema.Types.ObjectId },
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },
  history: { type: Array, default: [] },
  // history: [
  //   {
  //     gameMode: String,
  //     matchesAmount: { type: Number },
  //     passedTime: { type: Number },
  //     victory: { type: Boolean },
  //   },
  // ],
  highscore: { type: Number, default: 0 },
});

export default mongoose.model('User', schema);
