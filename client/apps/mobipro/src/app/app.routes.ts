import { Route } from '@angular/router';
import { ERouting } from './enums/routing';
import { ProductEffects } from './store/product/product.effects';
import { importProvidersFrom } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductReducer } from './store/product/product.reducer';

export const appRoutes: Route[] = [
    {
        path:       '',
        redirectTo: ERouting.HOME,
        pathMatch:  'full'
    },
    {
        path:       ERouting.HOME,
        loadComponent: () => import('./components/pages/home/main-front-page.component').then(m => m.FrontPageComponent)
    },
    {
        path:       ERouting.PRODUCT_PAGE,
        providers: [
            importProvidersFrom(StoreModule.forFeature('product', ProductReducer)),
            importProvidersFrom(EffectsModule.forFeature([ ProductEffects ]))
        ],
        loadComponent: () => import('./components/product/full-page-layout/product-page.component').then(m => m.ProductPageComponent)
    },
    {
		path:       '**',
		redirectTo: ERouting.HOME
	}
];
