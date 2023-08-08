import mongoose from 'mongoose';

const FavoritesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tracks: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }] },
  albums: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }] }
});

export const FavoritesModel = mongoose.model('Favorites', FavoritesSchema);
