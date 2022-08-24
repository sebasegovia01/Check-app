// src/interfaces/transfer.interface.ts

import { IAddressee } from './addressee.interface';
import { IClient } from './client.interface';

export interface IBaseTransfer {
  monto: number;
  id_destinatario: number;
  destinatario?: IAddressee;
  comentario?: string;
  created_at?: Date;
  id_cliente: number;
  cliente: IClient; 
}

export interface ITransfer extends IBaseTransfer {
  id: number;

}

