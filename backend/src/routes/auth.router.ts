/**
 * Required External Modules and Interfaces
 */

import * as express from 'express';
import { Request, Response } from 'express';
import { IClient } from '../interfaces/client.interface';
import { checkJwt } from '../middlewares/check-jwt';
import UserService from '../services/client.service';
import { createToken } from '../utils/jwt.util';

/**
 * Router Definition
 */

export const authRouter = express.Router();

const userService: UserService = new UserService();

authRouter.post('/clients/login', async (req: Request, res: Response) => {
  let { rut, password } = req.body;

  if (!(rut && password)) {
    res.status(400).json({ error: 'Rut y clave requeridos' });
  } else {
    // get user and validate if exist
    let client: IClient = await userService.findByRut(rut);

    if (client === null) {
      res.status(400).json({ error: 'Rut no encontrado' });
    } else {
      // verify password
      let isValid = await userService.validatePasword(password, client.password);

      if (!isValid) {
        res.status(401).json({ error: 'Clave incorrecta' });
      } else {
        //sign JWT, valid for 1 hour
        let [token, expiration_time] = createToken(client.id, client.correo);

        delete client.password

        res.status(200).json({ token: token, client });
      }
    }
  }
});

authRouter.put(
  '/clients/change_password/:id',
  [checkJwt],
  async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Ingrese un número valido como ID' });
    } else {
      try {
        const exist_user: IClient = await userService.findByID(id);

        if (exist_user) {
          await userService.changePassword(id, req.body['password']);

          return res.status(200).json({ updated: true });
        } else {
          res.status(404).json({ message: 'user not found', status: 404 });
        }
      } catch (e: any) {
        console.log('[UPDATE ERROR] ' + e.message);
        res
          .status(500)
          .json({
            error: 'Error interno al actualizar contraseña',
            status: 500,
          });
      }
    }
  }
);
