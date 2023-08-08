import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserModel } from "src/models/user.model";
import mongoose from "mongoose";
import { FileService, FileType } from "src/files/file.service";
import { FavoritesService } from "../favorites/favorites.service";

@Injectable()
export class UserService {
  constructor(private fileService: FileService, private favoritesService: FavoritesService) {
  }

  async create(createUserDto: CreateUserDto) {
    const user = new UserModel(createUserDto);
    const list = await this.favoritesService.create(user.id);
    user.favoritesListId = list._id
    await user.save();
    return user;
  }

  async findOne(id: mongoose.Types.ObjectId) {
    const userData = await UserModel.findById(id);
    return userData;
  }

  async findAll() {
    const users = await UserModel.find();
    return users;
  }

  async findByEmail(email) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  async uploadImage(id: mongoose.Types.ObjectId, file) {
    const imagePath = this.fileService.createFile(FileType.IMAGE, file);
    await UserModel.findByIdAndUpdate(id, { image: imagePath });
    return imagePath;
  }
}
