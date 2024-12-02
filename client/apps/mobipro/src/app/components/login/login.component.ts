import { CommonModule }      from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CookieService }     from 'ngx-cookie-service';

import { UserService } from "../../services/user.service";
import { IUserData }   from "../../interfaces/user.interface";

@Component({
    selector:    '[login-widget]',
    standalone:  true,
    imports:     [ CommonModule, ReactiveFormsModule ],
    providers:   [ CookieService ],
    templateUrl: './login-widget.component.html',
    styleUrls:   ['./login-widget.component.scss']
})
export class LoginWidgetComponent implements OnInit {
    public loginForm!: FormGroup;
    public userData:   IUserData | null = null;
    public error:      boolean = false;
    public message:    string = '';

    constructor(
        private _userService: UserService,
        private _frombBilder: FormBuilder,
        private _cookieService: CookieService
    ) {
        console.log('GET TOKEN: ', this._cookieService.get('userToken'));
    }

    ngOnInit(): void {
        this.buildLoginForm();
        this.getUserToken();

        console.log('Login component', this.getUserToken());
    }

    private buildLoginForm(): void {
        this.loginForm = this._frombBilder.group({
            email: [
                '', [
                    Validators.required,
                    Validators.pattern(/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/),
                    this.loginFormatValidator
                ]
            ],
            password: [
                '',
                [
                    Validators.minLength(4),
                    Validators.maxLength(20),
                    Validators.pattern(/^.{7,100}$/),
                    Validators.required,
                    this.loginFormatValidator
                ]
            ]
          });

        console.log('Build login form');
    }

    private loginFormatValidator(control: FormControl) {
        console.log('Login format validator: ', control.value);
    }

    public onSubmit(): void {
        if (this.loginForm.valid) {
            let formData = this.loginForm.value;

            console.log('Form data: ', formData.email, formData.password);

            this._userService.loginUser(formData).subscribe((_response) => {
                console.log('Response: ', _response);

                this.error = _response.error;

                if (!_response.error) {
                    this.message  = _response.message;
                    this.userData = _response.userData;

                    console.log('userData: ', this.userData);

                    this.setUserToken({
                        token:        _response.token,
                        refrashToken: _response.refreshToken
                    });
                }
            });
        }
    }

    private getUserToken(): string | null {
        return this._cookieService.get('userToken') || null;
    }

    private setUserToken(_token: { token: string; refrashToken: string; }): void {
        this._cookieService.set('userToken', JSON.stringify(_token));
    }

    public logoutUser(): void {
        console.log('Logout user');

        /*this._userService.logoutUser().subscribe((_response) => {
            console.log('Logout response: ', _response);
        });*/
    }
}