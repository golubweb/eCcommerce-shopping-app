import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient }   from '@angular/common/http';
import { provideRouter }       from '@angular/router';
import { StoreModule }         from '@ngrx/store';
import { EffectsModule }       from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { appRoutes }      from './app.routes';
import { ConfigReducer }  from './store/config/config.reducer';
import { ConfigEffects }  from './store/config/config.effects';

import { UserReducer } from './store/user/user.reducer';
import { UserEffects } from './store/user/user.effects';

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(appRoutes),
        importProvidersFrom(
            StoreModule.forRoot({ config: ConfigReducer }),
            StoreModule.forFeature('user', UserReducer),

            EffectsModule.forRoot([ ConfigEffects ]),
            EffectsModule.forFeature(UserEffects),
            StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: false })
        )
    ],
};
