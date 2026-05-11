import { CityEnum } from 'src/Enums/CityEnum';
import { ServiceTypeEnum } from 'src/Enums/ServiceTypeEnum';
import { StatusEnum } from 'src/Enums/StatusEnum';
import { GenerateHash } from 'src/Utilis/Hash';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
  BeforeInsert,
} from 'typeorm';

@Entity({ name: 'service_provider' })
@Index('idx_service_provider_email', ['email'], { unique: true })
@Index('idx_service_provider_phoneNumber', ['phoneNumber'], { unique: true })
@Index('idx_service_provider_Service_Type', ['name'], { unique: false })
export class ServiceProvider {
  
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255 , nullable: false })
    name: string;

    @Column({type: 'enum', enum: ServiceTypeEnum, nullable: false })
    Service_Type: string;

    @Column({type: 'varchar', length: 255 , nullable: false })
    email: string;

    @Column({type: 'varchar', length: 255 , nullable: false })
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await GenerateHash({ plaintext: this.password });
    }

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

    @Column({type: 'enum' , enum: StatusEnum , default: StatusEnum.ACTIVE})
    status: StatusEnum;

    @Column({type: 'timestamptz' , nullable: true , default: null})
    ConfirmPhoneNumberAt: Date;

    @UpdateDateColumn({type: 'timestamptz'})
    updatedAt: Date;

    @Column({type: 'timestamptz'})
    createdAt: Date;
}



