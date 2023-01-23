import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_AUTHENTICATION_HASH } from '../../settings';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.json({
      message: `Authorization param is required.`,
    }).status(401);
  }

  const [, token] = authHeader.split(' ');

  jwt.verify(token, SECRET_AUTHENTICATION_HASH, (err, user) => {
    if (err) {
      return res.json({
        message: `Invalid token`,
      }).status(403);
    }

    req.user = user;
    next();
  });
}