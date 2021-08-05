import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { useContainer as useContainerValidator } from 'class-validator';
import { RestApiModule } from './rest-api/rest-api.module';
import { BasicWebModule } from './basic-web/basic-web.module';
import { join } from 'path/posix';

import * as express from 'express';
import * as http from 'http';

async function bootstrap() {
  const server = express();

  const restApi = await NestFactory.create<NestExpressApplication>(
    RestApiModule,
    new ExpressAdapter(server),
  );

  useContainerValidator(restApi.select(RestApiModule), {
    fallbackOnErrors: true,
  });

  restApi.setGlobalPrefix('api');
  restApi.enableVersioning({ type: VersioningType.URI });
  restApi.useGlobalPipes(new ValidationPipe());

  const basicWeb = await NestFactory.create<NestExpressApplication>(
    BasicWebModule,
    new ExpressAdapter(server),
  );

  basicWeb.useGlobalPipes(new ValidationPipe());
  basicWeb.useStaticAssets(join(__dirname, '..', 'public'));
  basicWeb.setBaseViewsDir(join(__dirname, '..', 'views'));
  basicWeb.setViewEngine('hbs');

  const config = new DocumentBuilder()
    .setTitle('Smades Open API')
    .setDescription('Smades Open API docs')
    .setVersion('1.0')
    .addBasicAuth()
    .addBearerAuth()
    .build();

  SwaggerModule.setup(
    'api-docs',
    basicWeb,
    SwaggerModule.createDocument(restApi, config),
  );

  restApi.init();
  basicWeb.init();

  http.createServer(server).listen(3300);
}

bootstrap();
