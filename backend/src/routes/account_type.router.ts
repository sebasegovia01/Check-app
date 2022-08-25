/**
 * Required External Modules and Interfaces
 */

import * as express from 'express';
import { Request, Response } from 'express';
import { IAccountType } from '../interfaces/account_type.interface';
import { checkJwt } from '../middlewares/check-jwt';
import AccountTypeService from '../services/account_type.service';

/**
 * Router Definition
 */
export const accountTypeRouter = express.Router();

const account_type_service: AccountTypeService = new AccountTypeService();

// GET all account types
accountTypeRouter.get(
  '/account_types',
  [checkJwt],
  async (req: Request, res: Response) => {
    try {
      const account_types: IAccountType[] =
        await account_type_service.findAll();

      return res.status(200).send(account_types);
    } catch (e: any) {
      console.log('[GET ERROR] ' + e.message);
      res
        .status(500)
        .json({ error: 'Error interno al obtener usuario', status: 500 });
    }
  }
);
