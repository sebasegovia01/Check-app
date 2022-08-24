import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';

@Entity('tipo_cuenta')
export class AccounTypetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false})
  tipo_cuenta: string;

}