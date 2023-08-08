import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  hashPassword: { type: String, required: true },
  image: { type: String },
  favoritesListId: { type: mongoose.Schema.Types.ObjectId },
});
export const UserModel = mongoose.model('User', UserSchema);
