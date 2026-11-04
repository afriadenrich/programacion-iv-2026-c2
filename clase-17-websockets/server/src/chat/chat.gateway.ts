import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// Por defecto en el mismo puerto del server
@WebSocketGateway({
  cors: {
    origin: process.env.WS_ORIGIN || '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  serverWS: Server;

  handleConnection(client: Socket, ...args: any[]) {
    console.log('Se conectó', client.id);
  }

  handleDisconnect(client: Socket, reason?: string) {
    console.log('Se desconectó', client.id);
  }

  @SubscribeMessage('enviar')
  onMensajeEnviado(
    @MessageBody() mensaje: string,
    @ConnectedSocket() cliente: Socket,
  ) {
    this.serverWS.sockets.sockets.forEach((c) => {
      if (c.id !== cliente.id) {
        c.emit('respuesta', mensaje);
      }
    });
  }
}
