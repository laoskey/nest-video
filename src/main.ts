import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.use(
    session({
      secret: 'nest-videos',
      rolling: true,
      cookie: { maxAge: 1000 * 60 * 60 * 24 },
      name: 'nest-videos.sid',
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Nest-Video')
    .setDescription('The Nest-Video API description')
    .setVersion('1.0')
    .addTag('Nest-Video')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000, () => {
    console.log('http://127.0.0.1:3000');
  });
}
bootstrap().catch((error) => {
  console.error('Bootstrap failed:', error);
});
