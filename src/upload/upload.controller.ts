import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Response,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response as ExpressResponse } from 'express';
import { join } from 'path';
import { zip } from 'compressing';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('img')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    console.log('file upload', file);
    return 'You are so sexy';
  }

  @Get('export')
  download(@Response() res: ExpressResponse) {
    const url = join(__dirname, '../public/imgs/1742788559372.webp');
    return res.sendFile(url);
  }

  @Get('stream')
  down(@Response() res: ExpressResponse) {
    const url = join(__dirname, '../public/imgs/1742788559372.webp');
    const tarStream = new zip.Stream();
    tarStream.addEntry(url);

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename=Eric.zip');

    return tarStream.pipe(res);
  }
}
