import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

import * as bcrypt from 'bcrypt';

@Entity('cliente')
export class ClientEntity {
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

  @Column('longtext', {nullable: false})
  password: string;

  @CreateDateColumn()
  created_at: Date;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
