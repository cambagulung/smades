import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CommandMeta, CommandRunner } from '@squareboat/nest-console';
import { useContainer as useContainerValidator } from 'class-validator';
import { join } from 'path';
import { argv } from 'yargs';
import { AppModule } from './app.module';

async function bootstrap() {
  if (typeof argv._[0] != 'string') {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    useContainerValidator(app.select(AppModule), { fallbackOnErrors: true });

    app.useGlobalPipes(new ValidationPipe());
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');

    const config = new DocumentBuilder()
      .setTitle('Wardes Open API')
      .setDescription('Wardes Open API description')
      .setVersion('1.0')
      .addBasicAuth()
      .addBearerAuth()
      .build();

    SwaggerModule.setup('swag', app, SwaggerModule.createDocument(app, config));

    await app.listen(process.env.PORT || 3300);
  } else {
    const app = await NestFactory.createApplicationContext(AppModule, {
      logger: false,
    });

    useContainerValidator(app.select(AppModule), { fallbackOnErrors: true });

    const command = CommandMeta.getCommand(argv._[0]);

    if (!command || !command.target) {
      Logger.error(` ${argv._[0]} : command not found `);
      process.exit();
    }

    await CommandRunner.handle(command, argv);
    process.exit();
  }
}

bootstrap();
