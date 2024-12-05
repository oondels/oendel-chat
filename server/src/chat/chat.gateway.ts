import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // Método para lidar com a conexão de um cliente
  handleConnection(client: Socket): void {
    console.log(`User connected: ${client.id}`);
  }

  // Método para lidar com a desconexão de um cliente
  handleDisconnect(client: Socket): void {
    console.log(`User disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: { user: string; message: string }): void {
    this.server.emit('message', data);
  }
}
