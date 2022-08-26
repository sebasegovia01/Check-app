import { Addressee } from './addressee.model';
import { Client } from './client.model';

export class Transfer {
  id?: number;
  monto?: number;
  id_destinatario?: number;
  destinatario?: Addressee;
  comentario?: string;
  created_at?: Date;
  id_cliente?: number;
  cliente?: Client;
}
