// src/interfaces/account_type.interface.ts

export interface IBaseAccountType {
  id: number;
}

export interface IAccountType extends IBaseAccountType {
  tipo_cuenta: string;
}

