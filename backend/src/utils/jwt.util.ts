import * as jwt from 'jsonwebtoken';
import config from '../configs/jwt-config';

export const verifyToken = (token: string): any => {
  try {
    return <any>jwt.verify(token, config.jwtSecret);
  } catch (e: any) {
    console.log('[Token verification error]: ' + e);
    return null;
  }
};

export const createToken = (id: number, rut: string): any => {
  let expiration_time = config.jwtExpiration || '1h';

  const newToken = jwt.sign({ id, rut }, config.jwtSecret, {
    expiresIn: expiration_time,
  });

  return [newToken, expiration_time];
};

export const createNoExpirationToken = (id: number, rut: string): any => {
  const newToken = jwt.sign({ id, rut }, config.jwtSecret);

  return [newToken, null];
};
