import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from './Auth.service';
import { SignupCompanyDto } from './Dto/SignupCompany.Dto';
import { SignupServiceProviderDto } from './Dto/SignupServiceProvider.Dto';
import { LoginDto } from './Dto/Login.Dto';
import { IResponse, SuccessResponse } from './Utilis/SucessResponse';
import { i18nCustomService } from './Utilis/i18n.Service';
import { LoginCredentialsResponse } from './Enitities/login.Entity';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService,
  private readonly i18n: i18nCustomService,
  ) {}

  @GrpcMethod('AuthService', 'CompanySignUp')
  async CompanySignUp(Body: SignupCompanyDto): Promise<IResponse> {
    await this.authService.CompanySignUp(Body);
    return SuccessResponse({
      message: await this.i18n.Translate({key: 'test.LOGIN_SUCCESS'}),
      statusCode: 200,
    });
  }

  @GrpcMethod('AuthService', 'ServiceProviderSignUp')
  async ServiceProviderSignUp(Body: SignupServiceProviderDto): Promise<IResponse> {
    await this.authService.ServiceProviderSignUp(Body);
    return SuccessResponse({
      message: await this.i18n.Translate({key: 'test.'}),
      statusCode: 200,
    });
  }

  @GrpcMethod('AuthService', 'LoginCompany')
  async LoginCompany(Body: LoginDto): Promise<IResponse<LoginCredentialsResponse>> {
    const Credentials = await this.authService.loginCompany(Body);
    return SuccessResponse<LoginCredentialsResponse>({
      data: {
        Credentials
      },
      message: await this.i18n.Translate({key: 'test.LOGIN_SUCCESS'}),
      statusCode: 200,
    });
  }

  @GrpcMethod('AuthService', 'LoginServiceProvider')
  async LoginServiceProvider(Body: LoginDto): Promise<IResponse<LoginCredentialsResponse>>{
    const Credentials = await this.authService.loginServiceProvider(Body);
    return SuccessResponse<LoginCredentialsResponse>({
      data: {
        Credentials
      },
      message: await this.i18n.Translate({key: 'test.LOGIN_SUCCESS'}),
      statusCode: 200,
    });
  }

  
}
