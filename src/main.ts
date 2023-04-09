import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    })
  );

  await app.listen(process.env.PORT);
  Logger.log(`App running on port ${ process.env.PORT }`);
}
bootstrap();
