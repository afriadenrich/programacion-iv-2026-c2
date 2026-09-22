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
  async registrar() {
    if (!this.swPushService.isEnabled) {
      console.log('SW no está encendido');
      return;
    }

    const subscription: PushSubscription = await this.swPushService.requestSubscription({
      serverPublicKey: environment.PUBLIC_VAPID,
    });

    const json = subscription.toJSON();

    const endpoint = subscription.endpoint;
    const auth = subscription.getKey('auth');
    const p256dh = subscription.getKey('p256dh');

    const { data, error } = await this.supabaseService.Sup.from(
      'Suscripciones_Notificaciones',
    ).insert({
      endpoint: json.endpoint,
      auth: json.keys?.['auth'],
      p256dh: json.keys?.['p256dh'],
    });

    if (error) {
      console.log('falló la subida a supabase, ver cómo lo solucionamos jaja');
    }
  }
}
