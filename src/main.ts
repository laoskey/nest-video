import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import * as cors from 'cors';
import { join } from 'path';
import { Response as CustomerResponse } from './common/rsponse';
import { HttpFilter } from './common/filter';
import { RoleGuard } from './guard/role/role.guard';

const writeList = [
  '/user/test',
  '/v1/user',
  '/docs',
  '/v1/guard',
  '/v1/login',
  '/v1/upload/img',
  '/v1/upload/export',
  '/v1/upload/stream',
  '/imgs/1742786807038.jpg',
];
function middlewareAll(req: Request, res: Response, next: NextFunction) {
  console.log(req.originalUrl);

  if (writeList.includes(req.originalUrl)) {
    // console.log('我来了');

    next();
  } else {
    return res.status(403).json({
      code: 403,
      msg: '你没有权限',
    });
  }
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useStaticAssets(join(__dirname, 'public', 'imgs'), { prefix: '/imgs' });
  app.use(cors());
  app.use(
    session({
      secret: 'nest-videos',
      rolling: true,
      cookie: { maxAge: 1000 * 60 * 60 * 24 },
      name: 'nest-videos.sid',
    }),
  );

  // app.use(middlewareAll);

  // 返回拦截器
  app.useGlobalInterceptors(new CustomerResponse());
  // 错误过滤器
  app.useGlobalFilters(new HttpFilter());
  // 全局验证
  app.useGlobalPipes(new ValidationPipe());
  // 全局守卫
  // app.useGlobalGuards(new RoleGuard());

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
    // console.log(join(__dirname, 'public', 'imgs'));
  });
}
bootstrap().catch((error) => {
  console.error('Bootstrap failed:', error);
});
