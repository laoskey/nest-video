import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
