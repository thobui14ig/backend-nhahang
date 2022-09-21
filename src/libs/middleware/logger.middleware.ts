import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { body } = req
    // console.log('Request...', body);
    // throw new Error('Lỗi cmn rồi!');
    next();
  }
}
