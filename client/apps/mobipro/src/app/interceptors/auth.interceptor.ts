import { inject } from '@angular/core';
import { HttpEvent,  HttpRequest, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router }        from '@angular/router';
import { Observable }    from 'rxjs';

import { IUserToken } from '../interfaces/user.interface';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    let cookieService   = inject(CookieService),
        router          = inject(Router),
        tokenFromCookie = cookieService.get('userToken') || null,
        tokens          = (!!tokenFromCookie) ? JSON.parse(tokenFromCookie) : null;

    console.log('INTERCEPTOR: ', tokenFromCookie, tokens);

    if (!!tokens && tokens.hasOwnProperty('token')) {
        let clonedRequest = req.clone({ 
            headers: req.headers.set('Authorization', `Bearer ${tokens.token}`) 
        });

        console.log('INTERCEPTOR: ', clonedRequest);

        return next(clonedRequest);
    } else {
        return next(req);
    }
};