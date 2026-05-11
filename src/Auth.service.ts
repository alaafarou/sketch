import { BadRequestException, Injectable } from '@nestjs/common';
import { SignupCompanyDto } from './Dto/SignupCompany.Dto';
import { SignupServiceProviderDto } from './Dto/SignupServiceProvider.Dto';
import { LoginDto } from './Dto/Login.Dto';
import { DataSource, Repository } from 'typeorm';
import { Company } from './DataBase_Schema/Company';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Otp } from './DataBase_Schema/Otp';
import { ServiceProvider } from './DataBase_Schema/ServiceProvider';
import { i18nCustomService } from './Utilis/i18n.Service';
import { CompareHash } from './Utilis/Hash';
import { TokenService } from './Utilis/Token.Service';
import { UserTypesEnum } from './Enums/UserTypesEnum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,

    @InjectRepository(ServiceProvider)
    private serviceProviderRepository: Repository<ServiceProvider>,

    @InjectRepository(Otp)
    private otpRepository: Repository<Otp>,

    @InjectDataSource()
    private dataSource: DataSource,

    private readonly i18n: i18nCustomService,

    private readonly tokenService: TokenService,
  ) { }

  async CompanySignUp(Body: SignupCompanyDto) {
    const { email, phoneNumber, password, confirmPassword: _, ...companyFields } =
      Body;

    await this.dataSource.transaction(async (manager) => {
      const existing = await manager.findOne(Company, {
        where: [{ email }, { phoneNumber }],
      });

      if (existing) {
        throw new BadRequestException(
          await this.i18n.Translate({
            key: 'test.COMPANY_ALREADY_EXISTS',
            options: {},
          }),
        );
      }

      const newCompany = manager.create(Company, {
        email,
        phoneNumber,
        password,
        ...companyFields,
      });

      await manager.save(newCompany);
    });
  }

  async ServiceProviderSignUp(Body: SignupServiceProviderDto) {
    const {
      email,
      phoneNumber,
      password,
      confirmPassword,
      ...rest
    } = Body;

    const existingServiceProvider = await this.serviceProviderRepository.findOne({
        where: { email, phoneNumber },
        select: {
          id: true,
          email: true,
          phoneNumber: true,
        },
      });

    if (existingServiceProvider) {
        throw new BadRequestException(await this.i18n.Translate({
          key: 'test.SERVICE_PROVIDER_ALREADY_EXISTS',
        }),
      );
    }

    const newServiceProvider = this.serviceProviderRepository.create({
      email,
      phoneNumber,
      password,
      ...rest,
    });

    await this.serviceProviderRepository.save(newServiceProvider);

    if (!newServiceProvider) {
      throw new BadRequestException(await this.i18n.Translate({
        key: 'test.SERVICE_PROVIDER_CREATION_FAILED',
        options: {},
      }));
    }

  }



  async loginCompany(Body: LoginDto) {
    const { email, password } = Body;


    const company = await this.companyRepository.findOne({
      where: { email },
      select: {
        email: true,
        id: true,
      },
    });

    if (!company) {
      throw new BadRequestException(await this.i18n.Translate({
        key: 'test.COMPANY_NOT_FOUND',
      }));
    }

    if (!(await CompareHash({ plaintext: password, HashedValue: company.password }))) {
      throw new BadRequestException(await this.i18n.Translate({
        key: 'test.INVALID_CREDENTIALS',
      }));
    }

    const { AcessToken, RefreshToken } = await this.tokenService.GenerateCredentials(UserTypesEnum.Company, company.id);

    return {
      AcessToken,
      RefreshToken,
    };
  }



  async loginServiceProvider(Body:LoginDto) {
    const { email, password } = Body;


    const company = await this.companyRepository.findOne({
      where: { email },
      select: {
        email: true,
        id: true,
      },
    });

    if (!company) {
      throw new BadRequestException(await this.i18n.Translate({
        key: 'test.COMPANY_NOT_FOUND',
      }));
    }

    if (!(await CompareHash({ plaintext: password, HashedValue: company.password }))) {
      throw new BadRequestException(await this.i18n.Translate({
        key: 'test.INVALID_CREDENTIALS',
      }));
    }

    const { AcessToken, RefreshToken } = await this.tokenService.GenerateCredentials(UserTypesEnum.Company, company.id);

    return {
      AcessToken,
      RefreshToken,
    };
  }

}
