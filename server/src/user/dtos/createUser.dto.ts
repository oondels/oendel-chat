import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'O email não pode estar vazio.' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
    message:
      'A senha deve conter pelo menos uma letra, um número e um caractere especial.',
  })
  @IsOptional()
  @IsString()
  password?: string;
}
