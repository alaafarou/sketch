import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class LoginDto {

  @IsNotEmpty({ message: i18nValidationMessage('validation.EMAIL_REQUIRED') })
  @IsEmail({}, { message: i18nValidationMessage('validation.INVALID_EMAIL') })
  email: string;


  @IsString({ message: i18nValidationMessage('validation.MUST_BE_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.PASSWORD_REQUIRED') })
  password: string;
}
