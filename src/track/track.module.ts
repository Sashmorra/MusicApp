import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { AuthModule } from 'src/auth/auth.module';
import { FileService } from 'src/files/file.service';
@Module({
  controllers: [TrackController],
  providers: [TrackService, FileService],
  imports: [AuthModule],
})
export class TrackModule {}
