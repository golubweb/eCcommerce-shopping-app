import { PreloadingStrategy, Route } from '@angular/router';

import { Observable } from 'rxjs';
import { of }         from 'rxjs';

export class AppCustomPreloader implements PreloadingStrategy {
    preload(route: Route, load: Function): Observable<any> {
        return route.data && route.data['preload'] ? load() : of(null);
    }
}