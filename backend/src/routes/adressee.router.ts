/**
 * Required External Modules and Interfaces
 */

import * as express from 'express';
import { Request, Response } from 'express';
import { IBaseAddressee, IAddressee } from '../interfaces/addressee.interface';
import { checkJwt } from '../middlewares/check-jwt';
import AdresseeService from '../services/adressee.service';

/**
 * Router Definition
 */
export const addresseeRouter = express.Router();

const addressee_service: AdresseeService = new AdresseeService();

// GET adressees by client id
addresseeRouter.get(
  '/addressees/:client_id',
  [checkJwt],
  async (req: Request, res: Response) => {
    const client_id: number = parseInt(req.params.client_id, 10);

    if (isNaN(client_id)) {
      res.status(400).json({ error: 'Ingrese un número valido como ID' });
    } else {
      try {
        const addresses: IAddressee[] =
          await addressee_service.findAllByClientId(client_id);

        if (addresses) {
          return res.status(200).send(addresses);
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

// GET adfresses by character addressee_name and client id
addresseeRouter.get(
  '/addressees/search/:client_id/:addressee_name',
  [checkJwt],
  async (req: Request, res: Response) => {
    const client_id: number = parseInt(req.params.client_id, 10);
    const addressee_name: string = req.params.addressee_name;

    if (isNaN(client_id) || !addressee_name) {
      res.status(400).json({ error: 'Sin valores a consultar' });
    } else {
      try {
        const addresses: IAddressee[] =
          await addressee_service.searchClientByName(client_id, addressee_name);

        if (addresses) {
          return res.status(200).send(addresses);
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

// POST new addressee
addresseeRouter.post('/addressees/new', [checkJwt], async (req: Request, res: Response) => {
  try {
    const addressee: IBaseAddressee = req.body;

    const id = await addressee_service.create(addressee);

    res.status(201).json({ id: id });
  } catch (e: any) {
    console.log('[POST ERROR] ' + e.message);
    res
      .status(500)
      .json({ error: 'Error interno al crear usuario', status: 500 });
  }
});