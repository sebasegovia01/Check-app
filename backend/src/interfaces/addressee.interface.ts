// src/interfaces/addressee.interface.ts

import { IAccountType } from './account_type.interface';
import { IClient } from './client.interface';

export interface IBaseAddressee {
  nombre: string;
  rut: string;
  telefono?: string;
  correo?: string;
  cliente?: IClient;
  id_cliente: number;
  correlativo_nombre_banco: string;
  numero_cuenta: string;
  tipo_cuenta?: IAccountType;
  id_tipo_cuenta: number;
  created_at?: Date;
}

export interface IAddressee extends IBaseAddressee {
  id: number;
}


