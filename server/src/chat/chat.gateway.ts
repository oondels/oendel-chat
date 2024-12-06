import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../message/entities/message.entity';
import { CreateMessageDto } from '../message/dto/create-message.dto';
import { MessageService } from '../message/message.service';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  handleConnection(client: Socket): void {
    // console.log(`User connected: ${client.id}`);
    console.log(client.id);
  }

  handleDisconnect(client: Socket): void {
    // console.log(`User disconnected: ${client.id}`);
  }

  // Old Messages
  @SubscribeMessage('old-messages')
  async fetchOldMessages(
    @MessageBody() data: { userId: number },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const messages = await this.messageRepository
      .createQueryBuilder('message')
      .innerJoinAndSelect('message.user', 'user')
      .select([
        'message.id',
        'message.message',
        'message.created_at',
        'user.id',
        'user.name',
        'user.username',
      ])
      .orderBy('message.created_at', 'ASC')
      .getMany();

    client.emit('old-messages', messages);
  }

  // Send Message
  @SubscribeMessage('send-message')
  async handleMessage(
    @MessageBody() data: { user: number; message: string },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    console.log(`Mensagem recebida: ${data.message}`);

    // const data = new Date();
    const newMessage = this.messageRepository.create({
      user_id: data.user,
      message: data.message,
    });

    await this.messageRepository.save(newMessage);
    this.server.emit('new-message', newMessage);
  }
}
