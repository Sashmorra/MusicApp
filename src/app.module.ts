import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { FileModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TrackModule,
    AuthModule,
    UserModule,
    FileModule,
    FavoritesModule,
  ],
})
export class AppModule {}
