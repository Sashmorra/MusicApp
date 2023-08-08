import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { FileService } from 'src/files/file.service';
import { FavoritesService } from "../favorites/favorites.service";

@Module({
  controllers: [UserController],
  providers: [UserService, FileService, FavoritesService],
  imports: [forwardRef(() => AuthModule), UserModule],
  exports: [UserService],
})
export class UserModule {}
