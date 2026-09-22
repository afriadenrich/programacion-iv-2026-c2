import { Component, inject, signal } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { SupabaseService } from './services/supabase';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  swPushService = inject(SwPush);
  supabaseService = inject(SupabaseService);

  // Suscribira a recibir notificaciones
  registrar() {
    if (!this.swPushService.isEnabled) {
      console.log('SW no está encendido');
      return;
    }

    this.swPushService.requestSubscription({
      serverPublicKey: environment.PUBLIC_VAPID,
    });
  }
}
