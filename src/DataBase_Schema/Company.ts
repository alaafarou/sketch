import { StatusEnum } from 'src/Enums/StatusEnum';
import { CityEnum } from 'src/Enums/CityEnum';
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, Index } from 'typeorm';


@Entity({name: 'company'})
@Index('email_index', ['email'], { unique: true })
@Index('phoneNumber_index', ['phoneNumber'], { unique: true })
export class Company {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255 , nullable: false })
    name: string;

    @Column({type: 'varchar', length: 255 , nullable: false })
    brand: string;

    @Column({type: 'varchar', length: 255 , nullable: false })
    email: string;

    @Column({type: 'varchar', length: 255 , nullable: false })
    password: string;

    @Column({type: 'varchar', length: 255 , nullable: false })
    phoneNumber: string;

    @Column({type: 'varchar', length: 255 , nullable: false })
    address: string;

    @Column({ type: 'enum', enum: CityEnum, default: CityEnum.Riyadh })
    city: CityEnum;

    @Column({type: 'varchar', length: 255 , nullable: false })
    CommerialRegisterationNumber: string;

    @Column({type: 'varchar', length: 255 , nullable: false })
    TaxNumber: string;

    @Column({type: 'enum' , enum: StatusEnum , default: StatusEnum.PENDING})
    status: StatusEnum;

    @Column({type: 'timestamptz' , nullable: true , default: null})
    ConfirmPhoneNumberAt: Date;

    @UpdateDateColumn({type: 'timestamptz'})
    updatedAt: Date;

    @Column({type: 'timestamptz'})
    createdAt: Date;
}

