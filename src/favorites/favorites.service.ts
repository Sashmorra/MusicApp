import { Injectable } from '@nestjs/common';
import { FavoritesModel } from '../models/favorites.model';
import mongoose, { Schema, Types } from 'mongoose';
import ObjectId = mongoose.Types.ObjectId;
import { TrackModel } from '../models/track.model';

@Injectable()
export class FavoritesService {
  async create(id: mongoose.Types.ObjectId) {
    const list = new FavoritesModel({ userId: id });
    await list.save();
    return list;
  }

  async postTrack(
    trackId: mongoose.Types.ObjectId,
    favoritesId: mongoose.Types.ObjectId,
  ) {
    const track = await TrackModel.findById(trackId);
    const list = await FavoritesModel.findById(favoritesId);
    list.tracks.push(track._id);
    await list.save();
  }

  async deleteTrack(
    trackId: mongoose.Types.ObjectId,
    favoritesId: mongoose.Types.ObjectId,
  ) {
    const track = await TrackModel.findById(trackId);
    const list = await FavoritesModel.findById(favoritesId);
    list.tracks = list.tracks.filter((trackId) => {
      return trackId !== track._id;
    });
    const index = list.tracks.indexOf(track._id);
    list.tracks.splice(index, 1);
    list.save();
  }
}
