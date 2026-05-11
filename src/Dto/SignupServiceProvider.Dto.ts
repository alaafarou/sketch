import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { ServiceTypeEnum } from 'src/Enums/ServiceTypeEnum';
import { SignupAuthCoreDto } from './signup-shared.dto';

export class SignupServiceProviderDto extends SignupAuthCoreDto {
  @IsString({ message: i18nValidationMessage('validation.MUST_BE_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @MinLength(3, { message: i18nValidationMessage('validation.MIN_LENGTH') })
  @MaxLength(100, { message: i18nValidationMessage('validation.MAX_LENGTH') })
  name: string;

  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @IsEnum(ServiceTypeEnum, {
    message: i18nValidationMessage('validation.INVALID_SERVICE_TYPE'),
  })
  Service_Type: ServiceTypeEnum;
}
