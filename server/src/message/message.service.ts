import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async sendMessage(createMessageDto: CreateMessageDto) {
    const data = new Date();
    const newMessage = {
      ...createMessageDto,
      created_at: data,
    };
    return this.messageRepository.save(newMessage);
  }

  findAll() {
    return `This action returns all message`;
  }
}
