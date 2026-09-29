// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { withSupabase } from 'jsr:@supabase/server@^1';
import * as webpush from 'https://esm.sh/web-push';

const VAPID_PUBLIC = Deno.env.get('VAPID_PUBLIC');
const VAPID_SECRET = Deno.env.get('VAPID_SECRET');
const VAPID_MAIL = 'mailto:' + Deno.env.get('VAPID_MAIL');

webpush.setVapidDetails(VAPID_MAIL, VAPID_PUBLIC, VAPID_SECRET);

/*interface ReqPayload {
  name: string;
}*/

console.info('server started');

export default {
  fetch: withSupabase({ auth: ['publishable', 'secret'] }, async (req, ctx) => {
    // ctx.authMode === "secret"

    // Traer las suscripciones a las push (endpoint, auth, p256dh)
    const { data, error } = await ctx.supabase.from('Suscripciones_Notificaciones').select('*');

    if (error) {
      throw error;
    }

    // generar el contenido de las notificaciones
    for (const sus of data) {
      const { endpoint, auth, p256dh } = sus;

      webpush.sendNotification(
        {
          endpoint: endpoint,
          keys: {
            p256dh: p256dh,
            auth: auth,
          },
        },
        JSON.stringify({
          notification: {
            title: 'Hola mundo!',
            body: 'Clase 10 de programación, pensé que habían sido más jaja que loco, que termine el cuatri, ayuda',
            icon: '',
            vibrate: [100, 50, 100],
            data: {
              url: 'https://ejemplo-notificaciones.vercel.app/',
            },
          },
        }),
      );
    }

    // Enviar las notificacionoes

    return new Response('TODO OK', {
      status: 200,
      headers: {},
      statusText: 'OK',
    });
  }),
};
