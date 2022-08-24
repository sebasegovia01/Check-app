/**
 * Required External Modules
 */

import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { AccounTypetEntity } from '../entities/account_type.entity';
import { ClientEntity } from '../entities/client.entity';
import { AdresseeEntity } from '../entities/addressee.entity';
import { TransferEntity } from '../entities/transfer.entity';

dotenv.config();

/**
 * App Variables
 */

if (!process.env.DB_USER && !process.env.DB_PASSWORD) {
  console.log('No access to database');
  process.exit(1);
}

const HOST: string = process.env.DB_HOST as string;
const PORT: number = parseInt(process.env.DB_PORT as string, 10);
const USER: string = process.env.DB_USER as string;
const PASSWORD: string = process.env.DB_PASSWORD as string;
const DATABASE: string = process.env.DB_NAME as string;

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: HOST,
  port: PORT,
  username: USER,
  password: PASSWORD,
  database: DATABASE,
  synchronize: true,
  logging: false,
  entities: [AccounTypetEntity, ClientEntity, AdresseeEntity, TransferEntity],
  migrations: [],
  subscribers: [],
});
