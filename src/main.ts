import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { useContainer as useContainerValidator } from 'class-validator';
import { ApiModule } from './http/api/api.module';
import { WebModule } from './http/web/web.module';
import { join } from 'path/posix';

async function bootstrap() {
  const server = new ExpressAdapter();

  const api = await NestFactory.create<NestExpressApplication>(
    ApiModule,
    server,
  );

  api.init();
  api.setGlobalPrefix('api');
  api.enableVersioning({ type: VersioningType.URI });
  api.useGlobalPipes(new ValidationPipe());

  useContainerValidator(api.select(ApiModule), {
    fallbackOnErrors: true,
  });

  const web = await NestFactory.create<NestExpressApplication>(
    WebModule,
    server,
  );

  web.init();
  web.useGlobalPipes(new ValidationPipe());
  web.useStaticAssets(join(__dirname, '..', 'public'));
  web.setBaseViewsDir(join(__dirname, '..', 'views'));
  web.setViewEngine('hbs');

  useContainerValidator(web.select(WebModule), {
    fallbackOnErrors: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Smades Open API')
    .setDescription('Smades Open API docs')
    .setVersion('1.0')
    .addBasicAuth()
    .addBearerAuth()
    .build();

  SwaggerModule.setup(
    'api-docs',
    web,
    SwaggerModule.createDocument(api, config),
  );

  server.listen(3300);
}

bootstrap();
