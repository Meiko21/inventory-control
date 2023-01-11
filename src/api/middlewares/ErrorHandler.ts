import { NextFunction, Request, Response } from 'express';

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction): any {
  console.log('error.message: ', err?.message);
  console.log('err.response.data: ', err?.response?.data);

  return res.status(500).json({
    status: 'An error ocurred',
    error: err?.message
  });
}
