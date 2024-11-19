import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path:       '',
        redirectTo: 'home',
        pathMatch:  'full'
    },
    {
        path:       'home',
        loadComponent: () => import('./components/pages/home/main-front-page.component').then(m => m.FrontPageComponent)
    }
];
