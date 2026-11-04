import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Socket, io } from 'socket.io-client';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
})
export class App {
  mensajes = signal<string[]>([]);
  mensaje = '';

  cliente: Socket;

  constructor() {
    // Conectarme al websocket
    this.cliente = io('wss://server-websocket-2026.onrender.com:3000');

    this.escucharRespuestas();
  }

  enviarMensaje() {
    this.mensajes.update((anterior) => [...anterior, this.mensaje]);

    // Enviar el evento "enviar" al server
    this.cliente.emit('enviar', this.mensaje);

    this.mensaje = '';
  }

  escucharRespuestas() {
    // suscribirnos al evento de "respuesta" del server
    this.cliente.on('respuesta', (body: string) => {
      this.mensajes.update((ant) => [...ant, body]);
    });
  }
}
