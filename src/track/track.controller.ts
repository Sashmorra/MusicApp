import {
  Controller,
  Post,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFiles,
  Body,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateTrackDto } from './dto/create-track.dto';

@Controller('track')
@ApiTags('tracks')
@UseGuards(JwtAuthGuard)
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create(@UploadedFiles() files, @Request() req) {
    const { image, audio } = files;
    const id = req.user.id;
    const dto: CreateTrackDto = req.body;
    return this.trackService.create(dto, image[0], audio[0], id);
  }

  @Post('delete')
  delete(@Body() req) {
    const { imagePath, audioPath } = req;
    return this.trackService.delete(imagePath, audioPath);
  }
}
