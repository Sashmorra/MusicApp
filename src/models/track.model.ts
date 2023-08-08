import mongoose from 'mongoose';

const TrackSchema = new mongoose.Schema({
  name: { type: String, require: true },
  text: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  image: { type: String },
  audio: { type: String, require: true },
});

export const TrackModel = mongoose.model('Track', TrackSchema);
