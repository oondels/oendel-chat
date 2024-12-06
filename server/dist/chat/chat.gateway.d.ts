import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Repository } from 'typeorm';
import { Message } from '../message/entities/message.entity';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly messageRepository;
    server: Server;
    constructor(messageRepository: Repository<Message>);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    fetchOldMessages(data: {
        userId: number;
    }, client: Socket): Promise<void>;
    handleMessage(data: {
        user: number;
        message: string;
    }, client: Socket): Promise<void>;
}
