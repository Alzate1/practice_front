import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter,withViewTransitions } from '@angular/router';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(
    routes,
    withViewTransitions()

  ),
  // importProvidersFrom(
  //   HttpClientModule
  // ),
  provideHttpClient()
]
};
