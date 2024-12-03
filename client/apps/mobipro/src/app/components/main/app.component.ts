import { Component, OnInit }  from '@angular/core';
import { CommonModule }       from '@angular/common';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors }  from '@angular/common/http';
import { Store }              from '@ngrx/store';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthInterceptor } from '../../interceptors/auth.interceptor';

@Component({
	standalone:  true,
	imports:     [
		CommonModule,
		HeaderComponent, 
		FooterComponent,
		RouterOutlet,
		RouterLink,
		RouterLinkActive
	],
	providers: [
		//{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
	],
	selector:    'app-root',
	templateUrl: './app.component.html',
	styleUrl:    './app.component.scss',
})
export class AppComponent implements OnInit {
	title = 'mobipro';

	constructor(private _store: Store) {}

	ngOnInit() {
		this._store.subscribe((_state: any) => {		
			console.log('State_1: ', _state);
		});
	}
}
