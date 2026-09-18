import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiKeyInterceptor } from './interceptors/api-key-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
      // agrego mi interceptor
      withInterceptors([apiKeyInterceptor]),
    ),
  ],
};
