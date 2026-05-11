

import { UserTypesEnum } from 'src/Enums/UserTypesEnum';
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, Index } from 'typeorm';


@Entity({name: 'Otp'})
@Index('email_index', ['email'], { unique: true })
@Index('phoneNumber_index', ['phoneNumber'], { unique: true })
export class Otp {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255 , nullable: false })
    Code: string;

    @Column({type: 'boolean', default: false, nullable: false })
    IsUsed: boolean;

    @Column({type: 'varchar', length: 255 , nullable: false })
    Email: string;

    @Column({type: 'enum' , enum: UserTypesEnum , nullable: false })
    Type: UserTypesEnum;

    @Column({type: 'timestamptz' , nullable: true , default: null})
    ExpiredAt: Date; 

    @UpdateDateColumn({type: 'timestamptz'})
    updatedAt: Date;

    @Column({type: 'timestamptz'})
    createdAt: Date;
}

