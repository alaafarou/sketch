import { StatusEnum } from 'src/Enums/StatusEnum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity({ name: 'persons' })
@Index('idx_persons_email', ['email'], { unique: true })
@Index('idx_persons_phoneNumber', ['phoneNumber'], { unique: true })
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  phoneNumber: string;

  @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusEnum;

  @Column({ type: 'timestamptz', nullable: true, default: null })
  ConfirmPhoneNumberAt: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  photo:string;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}
