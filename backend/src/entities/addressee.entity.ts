import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn
} from 'typeorm';

import { AccounTypetEntity } from './account_type.entity';
import { ClientEntity } from './client.entity';

@Entity('destinatario')
export class AdresseeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false})
  nombre: string;

  @Column({ length: 13, nullable: false})
  rut: string;

  @Column({ length: 24, nullable: true})
  telefono: string;

  @Column({ length: 64, nullable: true})
  correo: string;

  @ManyToOne((type) => AccounTypetEntity)
  @JoinColumn({ name: 'id_tipo_cuenta', referencedColumnName: 'id' })
  tipo_cuenta: AccounTypetEntity;

  @Column({nullable: false})
  id_tipo_cuenta: number;

  @Column({ length: 7, nullable: false})
  correlativo_nombre_banco: string;

  @Column({ length: 24, nullable: false})
  numero_cuenta: string;

  @ManyToOne((type) => ClientEntity)
  @JoinColumn({ name: 'id_cliente', referencedColumnName: 'id' })
  cliente: ClientEntity;

  @Column({nullable: false})
  id_cliente: number;

  @CreateDateColumn()
  created_at: Date;

}