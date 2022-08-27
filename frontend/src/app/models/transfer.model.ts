import { Addressee } from './addressee.model';
import { Client } from './client.model';

export class Transfer {
  id?: number;
  monto?: any;
  id_destinatario?: number;
  destinatario?: Addressee;
  comentario?: string;
  created_at?: any;
  id_cliente?: number;
  cliente?: Client;
  nombre_banco?: string;
}
