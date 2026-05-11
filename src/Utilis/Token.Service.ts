import {
    Injectable,
  } from '@nestjs/common';
  import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
  import { JwtPayload } from 'jsonwebtoken';
  import { randomUUID } from 'crypto';
import { UserTypesEnum } from 'src/Enums/UserTypesEnum';
import { SignatureLevelEnum } from 'src/Enums/TokenEnums';
  
  
  @Injectable()
  export class TokenService {
  
    constructor(
      private readonly JwtService: JwtService,
    ) { }
  
    GenerateToken = async ({
      Payload,
      options,
    }: {
      Payload: object;
      options: JwtSignOptions;
    }): Promise<string> => {
      return await this.JwtService.signAsync(Payload, options);
    };
  
    VerifyToken = async ({
      token,
      options = {
        secret: process.env.USER_ACESS_TOKEN_KEY as string,
      },
    }: {
      token: string;
      options: JwtVerifyOptions;
    }): Promise<JwtPayload> => {
      return (await this.JwtService.verifyAsync(
        token,
        options,
      )) as any as JwtPayload;
    };
  
    GetSignatureslevel = async (UserType: UserTypesEnum): Promise<SignatureLevelEnum> => {
      let Signature: SignatureLevelEnum;
  
      switch (UserType) {
        case UserTypesEnum.Company:
          Signature = SignatureLevelEnum.company;
          break;
        case UserTypesEnum.Person:
          Signature = SignatureLevelEnum.person;
          break;
        case UserTypesEnum.ServiceProvider:
          Signature = SignatureLevelEnum.serviceProvider;
          break;
        default:
          Signature = SignatureLevelEnum.Admin;
      }
      return Signature;
    };
  
    GetTokenKeys = async (
      Signatures: SignatureLevelEnum,
    ): Promise<{ Acess_key: string; refresh_key: string }> => {
  
      const TokenKeys = { Acess_key: ' ', refresh_key: ' ' };
  
      switch (Signatures) {
  
        case SignatureLevelEnum.company:
          TokenKeys.Acess_key = process.env.COMPANY_ACESS_TOKEN_KEY as string;
          TokenKeys.refresh_key = process.env.COMPANY_REFRESH_TOKEN_KEY as string;
          break;
  
        case SignatureLevelEnum.person:
          TokenKeys.Acess_key = process.env.PERSON_ACESS_TOKEN_KEY as string;
          TokenKeys.refresh_key = process.env.PERSON_REFRESH_TOKEN_KEY as string;
          break;
  

        case SignatureLevelEnum.serviceProvider:
          TokenKeys.Acess_key = process.env.SERVICE_PROVIDER_ACESS_TOKEN_KEY as string;
          TokenKeys.refresh_key = process.env.SERVICE_PROVIDER_REFRESH_TOKEN_KEY as string;
            break;
  
        default:
          TokenKeys.Acess_key = process.env.ADMIN_ACESS_TOKEN_KEY as string;
          TokenKeys.refresh_key = process.env.ADMIN_REFRESH_TOKEN_KEY as string;

      }
  
      return TokenKeys;
    }
  
  
  
    GenerateCredentials = async (UserType: UserTypesEnum , UserId: number) => {
      const Signature = await this.GetSignatureslevel(UserType); 
      const TokenSecretKey = await this.GetTokenKeys(Signature);
      const jwtid = randomUUID();
  
      const AcessToken = await this.GenerateToken({
        Payload: { UserId: UserId },
        options: {
          secret: TokenSecretKey.Acess_key,
          expiresIn: Number(process.env.ACESS_TOKEN_EXPIRESIN as string),
          jwtid,
        },
      });
  
      const RefreshToken = await this.GenerateToken({
        Payload: { UserId: UserId },
        options: {
          secret: TokenSecretKey.refresh_key,
          expiresIn: Number(process.env.REFRESH_TOKEN_EXPIRESIN as string),
          jwtid,
        },
      });
  
      return { AcessToken, RefreshToken };
    };
  
  }
  