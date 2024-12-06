import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty({ message: 'O mensagem  não pode esta vazia' })
  @IsString()
  message: string;
  user_id: number;
  created_at: Date;
}
