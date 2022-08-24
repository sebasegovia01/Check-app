import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn
} from 'typeorm';

import { AdresseeEntity } from './addressee.entity';
import { ClientEntity } from './client.entity';

@Entity('transferencia')
export class TransferEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float',{nullable: false})
  monto: number;

  @Column('longtext', {nullable: true})
  comentario: string;

  @ManyToOne((type) => AdresseeEntity)
  @JoinColumn({ name: 'id_destinatario', referencedColumnName: 'id' })
  destinatario: AdresseeEntity;

  @Column({nullable: false})
  id_destinatario: number;

  @ManyToOne((type) => ClientEntity)
  @JoinColumn({ name: 'id_cliente', referencedColumnName: 'id' })
  client: ClientEntity;

  @Column({nullable: false})
  id_cliente: number;

  @CreateDateColumn()
  created_at: Date;

}