import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  sendMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.sendMessage(createMessageDto);
  }

  @Get()
  findAll() {
    return this.messageService.findAll();
  }
}
