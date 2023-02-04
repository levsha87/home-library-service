import { validate } from 'uuid';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';

export function validateUUID(uuid: string): boolean {
  const isValidUUID = validate(uuid);
  if (isValidUUID) return isValidUUID;
  throw new HttpException('UUID is not valid', HttpStatus.BAD_REQUEST);
}

export function throwError400(msg: string): void {
  throw new HttpException(msg, HttpStatus.BAD_REQUEST);
}

export function throwError403(msg: string): void {
  throw new HttpException(msg, HttpStatus.FORBIDDEN);
}

export function throwError404(msg: string): void {
  throw new HttpException(msg, HttpStatus.NOT_FOUND);
}
