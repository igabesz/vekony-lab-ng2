import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { AppModule } from './app/app.module';

// 3rd party deps
import 'jquery';
import 'bootstrap/dist/js/bootstrap.min.js';

if (process.env.ENV === 'production') {
	enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
