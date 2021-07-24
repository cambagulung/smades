import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer as validatorContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  validatorContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(process.env.PORT || 3300);
}

bootstrap();
