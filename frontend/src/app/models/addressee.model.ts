import { Client } from './client.model';
import { AccountType } from './account-type.model';

export class Addressee {
  id?: number;
  nombre?: string;
  rut?: string;
  telefono?: string;
  correo?: string;
  cliente?: Client;
  id_cliente?: number;
  correlativo_nombre_banco?: string;
  numero_cuenta?: string;
  tipo_cuenta?: AccountType;
  id_tipo_cuenta?: number;
  created_at?: Date;
}
