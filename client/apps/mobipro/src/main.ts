import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule }     from "@angular/common/http";

import { appConfig }    from './app/app.config';
import { AppComponent } from './app/components/main/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
