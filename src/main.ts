import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer as useContainerValidator } from 'class-validator';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  useContainerValidator(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  const config = new DocumentBuilder()
    .setTitle('Smades Open API')
    .setDescription('Smades Open API docs')
    .setVersion('1.0')
    .addBasicAuth()
    .addBearerAuth()
    .build();

  SwaggerModule.setup(
    'api/swagger-docs',
    app,
    SwaggerModule.createDocument(app, config),
  );

  await app.listen(process.env.PORT || 3300);
}

bootstrap();
