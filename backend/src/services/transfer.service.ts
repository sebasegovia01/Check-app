// src/services/transfer.service.ts

/**
 * Data Model Interfaces and Entities
 */

import { IBaseTransfer, ITransfer } from '../interfaces/transfer.interface';
import { TransferEntity } from '../entities/transfer.entity';
import { AppDataSource } from '../configs/data-source';

class TransferService {
  private connection: any;

  constructor() {
    this.connection = AppDataSource.manager;
  }

  public findAllByClientId = async (
    client_id: number
  ): Promise<ITransfer[]> => {
    let transfers: ITransfer[] = await this.connection.find(TransferEntity, {
      where: { id_cliente: client_id },
      relations: ['destinatario', 'destinatario.tipo_cuenta'],
    });

    transfers.forEach((transfer) => {
      delete transfer.id_cliente, delete transfer.id_destinatario;
      delete transfer.destinatario.id,
        delete transfer.destinatario.id_cliente,
        delete transfer.destinatario.id_tipo_cuenta,
        delete transfer.destinatario.tipo_cuenta.id;
    });

    return transfers;
  };

  public create = async (transfer: IBaseTransfer): Promise<number> => {
    const new_transfer = new TransferEntity();


    console.log("new transfer");
    console.log(transfer);

    new_transfer.id_destinatario = transfer.id_destinatario;
    new_transfer.monto = transfer.monto;
    new_transfer.comentario = transfer.comentario;
    new_transfer.id_cliente = transfer.id_cliente;

    await this.connection.save(new_transfer);

    return new_transfer.id;
  };
}

export default TransferService;
