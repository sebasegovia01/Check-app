// src/services/account_type.service.ts

/**
 * Data Model Interfaces and Entities
 */

import { IAccountType } from '../interfaces/account_type.interface';
import { AccounTypetEntity } from '../entities/account_type.entity';
import { AppDataSource } from '../configs/data-source';

class AccountTypeService {
  private connection: any;

  constructor() {
    this.connection = AppDataSource.manager;
  }

  public findAll = async (): Promise<IAccountType[]> => {
    let account_types: IAccountType[] = await this.connection.find(
      AccounTypetEntity
    );

    return account_types;
  };
}

export default AccountTypeService;
