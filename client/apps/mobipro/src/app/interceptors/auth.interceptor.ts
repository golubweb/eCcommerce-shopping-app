import { inject }            from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { CookieService }     from 'ngx-cookie-service';
import { Router }            from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (_req, next) => {
    let cookieService   = inject(CookieService),
        router          = inject(Router),
        tokenFromCookie = cookieService.get('userToken') || null,
        tokens          = (!!tokenFromCookie) ? JSON.parse(tokenFromCookie) : null,
        request         = (!!tokens && tokens.hasOwnProperty('token')) ? _req.clone({ headers: _req.headers.set('Authorization', `Bearer ${tokens.token}`) }) : _req;

    return next(request).pipe(
        catchError((_error: HttpErrorResponse) => {
            if (_error.status === 401) {
                console.log('Error 401: ', _error);
                cookieService.delete('userToken');
            }

            return throwError(_error);
        })
    );
};