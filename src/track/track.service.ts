import { Injectable } from "@nestjs/common";
import { CreateTrackDto } from "./dto/create-track.dto";
import { FileService, FileType } from "src/files/file.service";
import { TrackModel } from "src/models/track.model";

@Injectable()
export class TrackService {
  constructor(private fileService: FileService) {
  }

  async create(dto: CreateTrackDto, image, audio, id) {
    try {
      const imagePath = this.fileService.createFile(FileType.IMAGE, image);
      const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
      console.log({
        ...dto,
        author: id,
        image: imagePath,
        audio: audioPath
      });
      const track = new TrackModel({
        ...dto,
        author: id,
        image: imagePath,
        audio: audioPath
      });
      await track.save();
      return track;
    } catch (err) {
      console.log(err);
    }
  }

  async delete(imagePath, audioPath) {
    this.fileService.removeFile(imagePath);
    this.fileService.removeFile(audioPath);
    return "Success";
  }

}
