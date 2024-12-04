import { CommonModule }      from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Store }         from "@ngrx/store";
import { CookieService } from 'ngx-cookie-service';

import { UserService }  from "../../../services/user.service";
import { IUserData, IUserToken }    from "../../../interfaces/user.interface";

import * as userActions   from "../../../store/user/user.actions";
import * as userSelectors from "../../../store/user/user.selector";
import { IUserState } from "../../../store/user/user.interface";

@Component({
    selector:    '[app-login-widget]',
    standalone:  true,
    imports:     [ CommonModule, ReactiveFormsModule ],
    providers:   [ CookieService ],
    templateUrl: './login-widget.component.html',
    styleUrls:   ['./login-widget.component.scss']
})
export class LoginWidgetComponent implements OnInit {
    public loginForm!:       FormGroup;
    public userData:         IUserData | null = null;
    public isUserRequstSent: boolean = false;
    public error:            boolean = false;
    public isUserLogged:     boolean = false;
    public message:          string = '';

    constructor(
        private _store:         Store,
        private _userService:   UserService,
        private _frombBilder:   FormBuilder,
        private _cookieService: CookieService
    ) {}

    ngOnInit(): void {
        this.buildLoginForm();
        this.userHasToken();
        this.selectUserDataFromStore();
    }

    private userHasToken(): void {
        let tokenFromCookie: IUserToken | null = this.getUserToken();

        console.log('[login-widget] userHasToken(): ', tokenFromCookie);

        if (!!tokenFromCookie && tokenFromCookie.hasOwnProperty('token') && tokenFromCookie.hasOwnProperty('refreshToken') ) {
            console.log('!this.userData: ', !this.userData);

            (!this.userData) 
                ? this._userService.getUserData(tokenFromCookie.refreshToken).then((_value) => ((_value) ? this.isUserRequstSent = true: null))
                : this.selectUserDataFromStore();
        } else {
            this.isUserRequstSent = true;
        }
    }

    private selectUserDataFromStore(): void {
        let tokenFromCookie: IUserToken | null = this.getUserToken();

        this._store.select(userSelectors.selectUserData).subscribe((_response: IUserState) => {
            this.error = _response.error;

            if (!_response.error) {
                this.isUserLogged = true;
                this.message      = _response.message;
                this.userData     = _response.userData;

                if (!!_response.token && !!_response.refreshToken) {
                    (!!tokenFromCookie && this.compareOldTokenWithNew(tokenFromCookie, { token: _response.token, refreshToken: _response.refreshToken }))
                        ? this.setUserToken({ token: _response.token, refreshToken: _response.refreshToken })
                        : (!tokenFromCookie)
                            ? this.setUserToken({ token: _response.token, refreshToken: _response.refreshToken })
                            : null;
                }

            } else {
                this.isUserLogged = false;
                this.deleteUserToken();
            }
        });
    }

    private buildLoginForm(): void {
        this.loginForm = this._frombBilder.group({
            email: ['', [
                Validators.required,
                Validators.pattern(/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/),
                this.loginFormatValidator
            ]],
            password: ['',[
                Validators.minLength(4),
                Validators.maxLength(20),
                Validators.pattern(/^.{7,100}$/),
                Validators.required,
                this.loginFormatValidator
            ]]
          });
    }

    private loginFormatValidator(control: FormControl) {
        //console.log('Login format validator: ', control.value);
    }

    public onSubmit(): void {
        if (this.loginForm.valid) {
            let formData = this.loginForm.value;

            this.getUserData(formData);
        }
    }

    private getUserData(_formData: { email: string; password: string; }): void {
        this._userService.loginUser(_formData).then((_value: boolean) => {
            if (_value) this.isUserRequstSent = false;
        });
    }

    private getUserToken(): IUserToken | null {
        let tokenFromCookie: string = this._cookieService.get('userToken');

        return (!!tokenFromCookie) ? JSON.parse(tokenFromCookie) : null;
    }

    private setUserToken(_token: IUserToken): void {
        this._cookieService.set('userToken', JSON.stringify(_token));
    }

    private deleteUserToken(): void {
        this._cookieService.delete('userToken');
    }

    private compareOldTokenWithNew(_oldToken: IUserToken, _newToken: IUserToken): boolean {
        return (_oldToken.token !== _newToken.token || _oldToken.refreshToken !== _newToken.refreshToken);
    }

    public logoutUser(): void {
        let tokenFromCookie: IUserToken | null = this.getUserToken();

        if (!!tokenFromCookie && tokenFromCookie.hasOwnProperty('token') && tokenFromCookie.hasOwnProperty('refreshToken')) {
            this._userService.logoutUser(tokenFromCookie.refreshToken).then((_value: boolean) => {
                if (_value) this.deleteUserToken();
            });
        }
    }

    public openUserProfile(_id: string): void {
        console.log('Open user profile: ', _id);
    }
}