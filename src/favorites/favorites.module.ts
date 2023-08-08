import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports:[AuthModule]
})
export class FavoritesModule {}
