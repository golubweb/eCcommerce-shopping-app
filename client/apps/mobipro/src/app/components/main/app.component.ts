import { Component }    from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { appRoutes }       from '../../app.routes';

@Component({
  standalone:  true,
  imports:     [
    HeaderComponent, 
    FooterComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  selector:    'app-root',
  templateUrl: './app.component.html',
  styleUrl:    './app.component.scss',
})
export class AppComponent {
  title = 'mobipro';
}
