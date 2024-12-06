import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
    message:
      'A senha deve conter pelo menos uma letra, um número e um caractere especial.',
  })
  @IsString()
  password?: string;
}
