import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import connection from './db';

const PORT = process.env.PORT || 7777;
async function start() {
  try {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    const config = new DocumentBuilder()
      .setTitle('Spotify clone')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    app.enableCors();
    SwaggerModule.setup('swagger', app, document);
    await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    await connection();
  } catch (err) {
    console.log(err);
  }
}
start();
