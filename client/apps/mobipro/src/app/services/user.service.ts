import { Injectable }      from "@angular/core";
import { HttpClient }      from "@angular/common/http";
import { Store }           from "@ngrx/store";
import { CookieService }   from "ngx-cookie-service";
import { map, Observable } from "rxjs";

import { environment }      from "../../../../../environments/environment";
import { IUser, IUserData } from "../interfaces/user.interface";
import { IUserLogin }       from "../store/user/user.interface";

import * as userActions from "../store/user/user.actions";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(
        private _store: Store,
        private _http: HttpClient,
        private _cookieService: CookieService
    ) {}

    public loginUser(_loginData: IUser): Promise<boolean> {
        return new Promise((resolve) => {
            let url: string = `${environment.API_URL}/${environment.USER_LOGIN}`;

            this._http.post<IUserLogin>(url, _loginData).pipe(
                map((_response: IUserLogin) => {
                    if (!_response.error) {
                        this._store.dispatch(userActions.setUserData({ 
                            userData:     _response.userData, 
                            token:        _response.token, 
                            refreshToken: _response.refreshToken, 
                            message:      _response.message 
                        }));
                    }
                })
            ).subscribe({
                next:  () => resolve(true),
                error: () => resolve(false)
            });
        });
    }

    public getUserData(_refreshToken: string) {
        return new Promise((resolve) => {
            let url: string = `${environment.API_URL}/${environment.FIND_USER}`;

            this._http.post<{ token: string }>(url, { refreshToken: _refreshToken }).pipe(
                map((_response: any) => {
                    console.log('SERVICE => response: ', _response);

                    if (!!_response && !_response.error) {
                        this._store.dispatch(userActions.setUserData({ 
                            userData:     _response.userData, 
                            token:        _response.token, 
                            refreshToken: _response.refreshToken, 
                            message:      _response.message 
                        }));
                    }
                })
            ).subscribe({
                next:  () => resolve(true),
                error: () => resolve(false)
            });
        });
    }

    public logoutUser(_refreshToken: string): Promise<boolean> {
        return new Promise((resolve) => {
            let url: string = `${environment.API_URL}/${environment.USET_LOGOUT}`;

            this._http.post<{ token: string }>(url, { refreshToken: _refreshToken }).pipe(
                map((_response: any) => {
                    if (!_response.error) {
                        this._store.dispatch(userActions.setUserData({ 
                            userData:     null, 
                            token:        null, 
                            refreshToken: null, 
                            message:      _response.message 
                        }));
                    }
                })
            ).subscribe({
                next:  () => resolve(true),
                error: () => resolve(false)
            });
        });
    }
}