import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { authInterceptor } from './app/core/auth.interceptor';

const config = {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideHttpClient(
      withFetch(),  // Add this line
      withInterceptors([authInterceptor])
    )
  ]
};

bootstrapApplication(AppComponent, config)
  .catch((err) => console.error(err));