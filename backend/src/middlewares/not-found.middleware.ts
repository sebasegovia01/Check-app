// src/middleware/not-found.middleware.ts

import { Request, Response, NextFunction } from 'express';

export const notFoundHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const message = {'message': 'Resource not found', 'status': 404};

  response.status(404).json(message);
};
