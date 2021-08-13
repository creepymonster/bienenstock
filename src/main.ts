import { enableProdMode, ViewEncapsulation } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule, {
  defaultEncapsulation: ViewEncapsulation.ShadowDom,
  providers: [
    { provide: LOCALE_ID, useValue: 'de-DE' }
  ]
}).catch(err => console.error(err));
