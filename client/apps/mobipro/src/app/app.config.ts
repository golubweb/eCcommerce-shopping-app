import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter }     from '@angular/router';
import { provideStore, StoreModule }      from '@ngrx/store';
import { EffectsModule, provideEffects }    from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { appRoutes }      from './app.routes';
import { ConfigReducer }  from './store/config/config.reducer';
import { ConfigEffects }  from './store/config/config.effects';
import { ProductReducer } from './store/product/product.reducer';
import { ProductEffects } from './store/product/product.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    importProvidersFrom(
      StoreModule.forRoot({ config: ConfigReducer }),
      //StoreModule.forFeature('product', ProductReducer),
      
      EffectsModule.forRoot([ ConfigEffects ]),
      //EffectsModule.forFeature(ProductEffects),
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: false
      })
    ),
    //provideStore({ config: ConfigReducer, product: ProductReducer }),
    //provideEffects([ ConfigEffects, ProductEffects ])
  ],
};
