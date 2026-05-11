import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { IsMatch } from 'src/Decoratores/IsMatch.decorator';
import { CityEnum } from 'src/Enums/CityEnum';
import { StatusEnum } from 'src/Enums/StatusEnum';

/** Shared: identity + password (company & service-provider signup). */
export class SignupAuthCoreDto {
  @IsString({ message: i18nValidationMessage('validation.MUST_BE_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @IsEmail({}, { message: i18nValidationMessage('validation.INVALID_EMAIL') })
  email: string;

  @IsString({ message: i18nValidationMessage('validation.MUST_BE_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @Matches(/^\+9665\d{8}$/, {
    message: i18nValidationMessage('validation.PHONE_SA'),
  })
  phoneNumber: string;

  @IsString({ message: i18nValidationMessage('validation.MUST_BE_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.PASSWORD_REQUIRED') })
  password: string;

  @IsString({ message: i18nValidationMessage('validation.MUST_BE_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @IsMatch(['password'], {
    message: i18nValidationMessage('validation.PASSWORD_MATCH'),
  })
  confirmPassword: string;


  @IsString({ message: i18nValidationMessage('validation.MUST_BE_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @MinLength(3, { message: i18nValidationMessage('validation.MIN_LENGTH') })
  @MaxLength(100, { message: i18nValidationMessage('validation.MAX_LENGTH') })
  address: string;

  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @IsEnum(CityEnum, { message: i18nValidationMessage('validation.INVALID_CITY') })
  city: CityEnum;

  @IsString({ message: i18nValidationMessage('validation.MUST_BE_STRING') })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.COMMERCIAL_REG_REQUIRED'),
  })
  CommerialRegisterationNumber: string;

  @IsString({ message: i18nValidationMessage('validation.MUST_BE_STRING') })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.TAX_NUMBER_REQUIRED'),
  })
  TaxNumber: string;

  @IsOptional()
  @IsEnum(StatusEnum, { message: i18nValidationMessage('validation.INVALID_STATUS') })
  status?: StatusEnum;
}


