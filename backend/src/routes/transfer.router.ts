/**
 * Required External Modules and Interfaces
 */

 import * as express from 'express';
 import { Request, Response } from 'express';
import { IBaseTransfer, ITransfer } from '../interfaces/transfer.interface';
 import { checkJwt } from '../middlewares/check-jwt';
 import TransferService from '../services/transfer.service';
 
 /**
  * Router Definition
  */
 export const transferRouter = express.Router();
 
 const transfer_service: TransferService = new TransferService();
 
 // GET transfers by client id
 transferRouter.get(
  '/transfers/:client_id',
  [checkJwt],
  async (req: Request, res: Response) => {
    const client_id: number = parseInt(req.params.client_id, 10);

    if (isNaN(client_id)) {
      res.status(400).json({ error: 'Ingrese un número valido como ID' });
    } else {
      try {
        const addresses: ITransfer[] =
          await transfer_service.findAllByClientId(client_id);

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

// POST new transfer
transferRouter.post('/transfers/new', [checkJwt], async (req: Request, res: Response) => {
  try {
    const addressee: IBaseTransfer = req.body;

    const id = await transfer_service.create(addressee);

    res.status(201).json({ id: id });
  } catch (e: any) {
    console.log('[POST ERROR] ' + e.message);
    res
      .status(500)
      .json({ error: 'Error interno al crear usuario', status: 500 });
  }
});