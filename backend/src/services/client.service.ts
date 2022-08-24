// src/services/client.service.ts

/**
 * Data Model Interfaces and Entities
 */

import { IBaseClient, IClient } from '../interfaces/client.interface';
import { ClientEntity } from '../entities/client.entity';
import { AppDataSource } from '../configs/data-source';

class UserService {
  private connection: any;

  constructor() {
    this.connection = AppDataSource.manager;
  }

  private findAll = async (): Promise<IClient[]> => {
    let clients: IClient[] = await this.connection.find(ClientEntity);

    return clients;
  };

  public findByID = async (id: number): Promise<IClient> => {
    let client: IClient = await this.connection.findOneBy(ClientEntity, { id: id });

    delete client.password;

    return client;
  };

  public findByRut = async (rut: string): Promise<IClient> => {
    let client: IClient = await AppDataSource.manager.findOneBy(ClientEntity, {
      rut: rut,
    });

    return client;
  };

  public validatePasword = async (
    password: string,
    hashed: string
  ): Promise<boolean> => {

    const user = new ClientEntity();

    user.password = hashed;

    let isValid = await user.checkIfPasswordIsValid(password);

    return isValid;
  };

  private exist = async (user: IBaseClient): Promise<number> => {
    let count = await AppDataSource.manager.countBy(ClientEntity, {
      rut: user.rut,
      correo: user.correo,
    });

    return count;
  };

  public create = async (user: IBaseClient): Promise<number> => {
    if ((await this.exist(user)) <= 0) {

      const new_user = new ClientEntity();

      new_user.nombre = user.nombre;
      new_user.rut = user.rut;
      new_user.telefono = user.telefono;
      new_user.correo = user.correo;
      new_user.password = user.password;

      new_user.hashPassword();

      await this.connection.save(new_user);

      return new_user.id;
    } else {
      return null;
    }
  };

  public changePassword = async (id: number, password: string): Promise<void> => {

    console.log(password);

    const user = new ClientEntity();

    user.password = password;
    user.hashPassword();

    await this.connection.update(ClientEntity, id, {password: user.password});
  };

  public update = async (id: number, user: IBaseClient): Promise<void> => {

    delete user.password;

    await this.connection.update(ClientEntity, id, user);
  };

  public delete = async (id: number): Promise<null | void> => {
    await this.connection.delete(ClientEntity, id);
  };
}

export default UserService;
