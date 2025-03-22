import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as session from 'express-session';
import * as cors from 'cors';

const writeList = ['/user/test'];
function middlewareAll(req: Request, res: Response, next: NextFunction) {
  console.log(req.originalUrl);

  if (writeList.includes(req.originalUrl)) {
    console.log('我来了');

    next();
  } else {
    return res.status(403).json({
      code: 403,
      msg: '你没有权限',
    });
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.use(cors());
  app.use(
    session({
      secret: 'nest-videos',
      rolling: true,
      cookie: { maxAge: 1000 * 60 * 60 * 24 },
      name: 'nest-videos.sid',
    }),
  );

  app.use(middlewareAll);

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
