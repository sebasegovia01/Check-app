/**
 * Required External Modules and Interfaces
 */

import { Request, Response, NextFunction } from 'express';
import { createToken, verifyToken } from '../utils/jwt.util';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {

  let jwt = <string>req.headers.authorization;

  if (!jwt) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  if (jwt.toLowerCase().startsWith('bearer')) {
    jwt = jwt.slice('bearer'.length).trim();
  }

  let jwtPayload = verifyToken(jwt);

  if (jwtPayload) {
    res.locals.jwtPayload = jwtPayload;

    // token valid for 1 hour
    // send a new token on every request
    const { id, rut } = jwtPayload;
    let [new_token, expiration_time] = createToken(id, rut);

    // recibir header en front y actualizar token desde allí
    res.setHeader('Authorization', "Bearer "+new_token);

    //next middleware or controller
    next();
  } else {

    res.status(401).json({ message: 'Unauthorized or token expired' });
  }
};
