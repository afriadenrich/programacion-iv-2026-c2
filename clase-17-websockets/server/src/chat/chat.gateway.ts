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
    origin: 'https://client-websocket-2026.onrender.com',
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
    const salasDelCliente: string[] = [];
    cliente.rooms.forEach((room) => {
      salasDelCliente.push(room);
    });

    this.serverWS.to(salasDelCliente).emit('respuesta', mensaje);

    // TODOS MENOS YO
    // this.serverWS.sockets.sockets.forEach((c) => {
    //   if (c.id !== cliente.id) {
    //     c.emit('respuesta', mensaje);
    //   }
    // });
  }

  @SubscribeMessage('unirse')
  onUnirseASala(
    @MessageBody() sala: string,
    @ConnectedSocket() cliente: Socket,
  ) {
    cliente.join(sala);
  }
}
