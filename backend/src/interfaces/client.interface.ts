// src/interfaces/client.interface.ts

export interface IBaseClient {
  nombre: string;
  rut: string;
  telefono?: string;
  correo?: string;
  password: string;
  created_at?: Date;
}

export interface IClient extends IBaseClient {
  id: number;
}