import type {Request, Response, NextFunction} from 'express';
import SdtError from './SdtError';
import { ValidationError } from 'yup';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("⚠️ Error reported!")
  console.error(err);
  if (err instanceof SdtError) {
    err.toExpressResponse(res);
  } else if (err instanceof ValidationError) {
    const error = new SdtError(400, 'Validation Error', err.errors);
    error.toExpressResponse(res);
  } else if (err instanceof PrismaClientKnownRequestError){
    let errorMsg = ''
    switch (err.code) {
      case 'P2002':
        errorMsg = 'Duplicate entry'
        break;
      default:
        errorMsg = err.message
        break;
    }
    const error = new SdtError(400, errorMsg, err.meta);
    error.toExpressResponse(res);
  } else {
    console.error(err);
    const error = new SdtError(500, 'Internal Server Error', err);
    error.toExpressResponse(res);
  }
}

export default errorHandler;