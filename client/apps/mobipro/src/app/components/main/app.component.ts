import { Component, OnInit }          from '@angular/core';
import { CommonModule }       from '@angular/common';
import { provideStore, Store, StoreModule } from '@ngrx/store';
import { EffectsModule, provideEffects }    from '@ngrx/effects';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

//import { ConfigReducer } from '../../store/config/config.reducer';
//import { ConfigEffects } from '../../store/config/config.effects';

@Component({
	standalone:  true,
	imports:     [
		CommonModule,
		HeaderComponent, 
		FooterComponent,
		RouterOutlet,
		RouterLink,
		RouterLinkActive,
		//StoreModule.forRoot({ config: configReducer }),
		//EffectsModule.forRoot([ ConfigEffects ])
	],
	/*providers: [
		provideStore({ config: configReducer }),
		provideEffects([ ConfigEffects ])
	],*/
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
