import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Store }      from "@ngrx/store";
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
        private _http: HttpClient
    ) {}

    public loginUser(_loginData: IUser) {
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
        ).subscribe();
    }

    public getUserData(_token: string) {
        let url: string = `${environment.API_URL}/${environment.FIND_USER}`;

        console.log('SERVICE getUserData: ', url, _token);

        this._http.post<{ token: string }>(url, { token: _token }).pipe(
            map((_response: any) => {
                console.log('SERVICE response: ', _response);

                if (!_response.error) {
                    this._store.dispatch(userActions.setUserData({ 
                        userData:     _response.userData, 
                        token:        _response.token, 
                        refreshToken: _response.refreshToken, 
                        message:      _response.message 
                    }));
                }
            })
        ).subscribe();
    }
}