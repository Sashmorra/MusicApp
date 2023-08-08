import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('favorites')
@ApiTags('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('track')
  postTrack(@Request() req) {
    const favoritesId = req.user.user.favoritesListId;
    const { trackId } = req.body;
    this.favoritesService.postTrack(trackId, favoritesId);
  }
  @Post('track/delete')
  deleteTrack(@Request() req) {
    const favoritesId = req.user.user.favoritesListId;
    const { trackId } = req.body;
    this.favoritesService.deleteTrack(trackId, favoritesId);
  }
}
