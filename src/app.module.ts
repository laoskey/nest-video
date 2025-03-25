import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadModule } from './upload/upload.module';
import { LoginModule } from './login/login.module';
import { SpiderModule } from './spider/spider.module';
import { GuardModule } from './guard/guard.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb://localhost:27017/express-video'),
    UploadModule,
    LoginModule,
    SpiderModule,
    GuardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
