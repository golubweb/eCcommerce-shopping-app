import { Component }    from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  standalone:  true,
  imports:     [ RouterModule, HeaderComponent, FooterComponent ],
  selector:    'app-root',
  templateUrl: './app.component.html',
  styleUrl:    './app.component.scss',
})
export class AppComponent {
  title = 'mobipro';
}
