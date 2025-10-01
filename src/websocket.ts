import {WebSocketGateway,WebSocketServer,SubscribeMessage,MessageBody,ConnectedSocket,OnGatewayConnection,OnGatewayDisconnect,} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // ⚠️ тут можно указать свой фронтенд-домен
  },
})
export class OrderItemsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // Когда клиент подключается
  handleConnection(client: Socket) {
    console.log(`Клиент подключился: ${client.id}`);
  }

  // Когда клиент отключается
  handleDisconnect(client: Socket) {
    console.log(`Клиент отключился: ${client.id}`);
  }

  // Клиент может отправить событие "ping"
  @SubscribeMessage('ping')
  handlePing(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log(`Пришёл ping от ${client.id}:`, data);
    client.emit('pong', { message: 'pong!' });
  }

  // Сервер может всем отправить событие
  notifyCookingFinished(orderItem: any) {
    this.server.emit('orderItemUpdated', orderItem);
  }
}
