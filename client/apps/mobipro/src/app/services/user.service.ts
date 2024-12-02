import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../../../../../environments/environment";
import { IUser }       from "../interfaces/user.interface";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private _http: HttpClient) {
        console.log('User service');
    }

    public loginUser(_loginData: IUser): Observable<any> {
        let url: string = `${environment.API_URL}/auth/login`;

        console.log('URL: ', url, _loginData);

        return this._http.post(url, _loginData);
    }
}