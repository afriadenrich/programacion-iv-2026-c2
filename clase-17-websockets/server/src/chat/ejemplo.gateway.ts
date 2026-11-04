import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// Por defecto en el mismo puerto del server
@WebSocketGateway()
export class Ejemplogateway {
  @WebSocketServer()
  serverWS: Server; // me da la información de todos los conectados + la capacidad de mandar mensaje a TODOS

  // Escuchar mensajes que mande el cliente
  @SubscribeMessage('createChat')
  create(
    @MessageBody() createChatDto: any,
    @ConnectedSocket() cliente: Socket,
  ) {
    // SOLO AL CLIENTE QUE ENVIÓ EL MENSAJE
    // cliente.emit('respuestaDelServidor', 'te respondo');

    // ESTE LE RESPONDE A TODOS
    this.serverWS.emit('respuesta', createChatDto);
    // return this.chatService.create(createChatDto);
  }
}
