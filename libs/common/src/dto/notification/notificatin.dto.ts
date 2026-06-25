import { IsEmail, IsObject, IsString } from 'class-validator';

export type EMAIL_TEMPLATES =
  | 'welcome'
  | 'password-reset'
  | 'email-verification';

export class SendEmailDto {
  @IsEmail()
  email: string;
  @IsString()
  template: EMAIL_TEMPLATES;
  @IsObject()
  data: Record<string, any>;
}
