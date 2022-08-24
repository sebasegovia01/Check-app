// src/services/adressee.service.ts

/**
 * Data Model Interfaces and Entities
 */

import { Like } from 'typeorm';
import { IBaseAddressee, IAddressee } from '../interfaces/addressee.interface';
import { AdresseeEntity } from '../entities/addressee.entity';
import { AppDataSource } from '../configs/data-source';

class AdresseeService {
  private connection: any;

  constructor() {
    this.connection = AppDataSource.manager;
  }

  public findAllByClientId = async (
    client_id: number
  ): Promise<IAddressee[]> => {
    let adressees: IAddressee[] = await this.connection.find(AdresseeEntity, {
      where: { id_cliente: client_id },
      relations: ['tipo_cuenta'],
    });

    return adressees;
  };

  public findByID = async (id: number): Promise<IAddressee> => {
    let adressee: IAddressee = await this.connection.findOneBy(AdresseeEntity, { id: id });

    return adressee;
  };

  public searchClientByName = async (
    client_id: number,
    character_name: string
  ): Promise<IAddressee[]> => {
    let adressees: IAddressee[] = await this.connection.find(AdresseeEntity, {
      select: ['id', 'nombre'],
      where: {id_cliente: client_id, nombre: Like(`%${character_name}%`)},
    });

    return adressees;
  };

  private exist = async (addressee: IBaseAddressee): Promise<number> => {
    let count = await AppDataSource.manager.countBy(AdresseeEntity, {
      rut: addressee.rut,
    });

    return count;
  };

  public create = async (addressee: IBaseAddressee): Promise<number> => {
    if ((await this.exist(addressee)) <= 0) {
      const new_addressee = new AdresseeEntity();

      new_addressee.nombre = addressee.nombre;
      new_addressee.rut = addressee.rut;
      new_addressee.telefono = addressee.telefono;
      new_addressee.correo = addressee.correo;
      new_addressee.correlativo_nombre_banco =
        addressee.correlativo_nombre_banco;
      new_addressee.numero_cuenta = addressee.numero_cuenta;
      new_addressee.id_tipo_cuenta = addressee.id_tipo_cuenta;
      new_addressee.id_cliente = addressee.id_cliente;

      await this.connection.save(new_addressee);

      return new_addressee.id;
    } else {
      return null;
    }
  };
}

export default AdresseeService;
