/**
 * Required External Modules and Interfaces
 */

import * as express from 'express';
import { Request, Response } from 'express';
import { IBaseClient, IClient } from '../interfaces/client.interface';
import { checkJwt } from '../middlewares/check-jwt';
import UserService from '../services/client.service';
/**
 * Router Definition
 */

export const usersRouter = express.Router();

const userService: UserService = new UserService();

// GET users by user id
usersRouter.get(
  '/clients/:id',
  [checkJwt],
  async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Ingrese un número valido como ID' });
    } else {
      try {
        const user: IClient = await userService.findByID(id);

        if (user) {
          return res.status(200).send(user);
        } else {
          res.status(404).json({});
        }
      } catch (e: any) {
        console.log('[GET ERROR] ' + e.message);
        res
          .status(500)
          .json({ error: 'Error interno al obtener usuario', status: 500 });
      }
    }
  }
);

// POST users
usersRouter.post('/clients', [checkJwt], async (req: Request, res: Response) => {
  try {
    const user: IBaseClient = req.body;

    const id = await userService.create(user);

    res.status(201).json({ id: id });
  } catch (e: any) {
    console.log('[POST ERROR] ' + e.message);
    res
      .status(500)
      .json({ error: 'Error interno al crear usuario', status: 500 });
  }
});

// PUT users by user id
usersRouter.put(
  '/client/:id',
  [checkJwt],
  async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Ingrese un número valido como ID' });
    }

    try {
      const user_update: IClient = req.body;

      const exist_user: IClient = await userService.findByID(id);

      if (exist_user) {
        await userService.update(id, user_update);

        return res.status(200).json({ updated: true });
      }

      res.status(404).json({ message: 'user not found', status: 404 });
    } catch (e: any) {
      console.log('[UPDATE ERROR] ' + e.message);
      res
        .status(500)
        .json({ error: 'Error interno al actualizar usuario', status: 500 });
    }
  }
);

// DELETE users by user id
usersRouter.delete(
  '/clients/:id',
  [checkJwt],
  async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Ingrese un número valido como ID' });
    }

    try {
      const exist_user: IClient = await userService.findByID(id);

      if (exist_user) {
        await userService.delete(id);

        return res.status(200).json({ deleted: true });
      }

      res.status(404).json({ message: 'user not found', status: 404 });
    } catch (e: any) {
      console.log('[DELETE ERROR] ' + e.message);
      res
        .status(500)
        .json({ error: 'Error interno al eliminar usuario', status: 500 });
    }
  }
);
