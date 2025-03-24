/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

type ClassConstructor<T> = new (...args: any[]) => T;
@Injectable()
export class LoginPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    console.log('value', value);
    console.log('metadata', metadata);

    if (!metadata.metatype || typeof metadata.metatype !== 'function') {
      throw new Error('Invalid DTO type');
    }

    const DTO = plainToInstance(
      metadata.metatype as ClassConstructor<typeof metadata.metatype>,
      value,
    );

    console.log(DTO);
    const errors = await validate(DTO);
    if (Array.isArray(errors) && errors.length) {
      console.log(errors);
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }

    return DTO;
  }
}
