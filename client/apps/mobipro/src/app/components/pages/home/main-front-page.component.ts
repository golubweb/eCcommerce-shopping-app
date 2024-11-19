import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
    selector:    '[front-page]',
    standalone:  true,
    imports:     [RouterModule],
    templateUrl: './main-front-page.component.html',
    styleUrls:   ['./main-front-page.component.scss']
})
export class FrontPageComponent {
    constructor() {}
}