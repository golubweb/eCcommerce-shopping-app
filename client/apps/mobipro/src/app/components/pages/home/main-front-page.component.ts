import { AfterViewInit, Component, OnInit } from "@angular/core";
import { RouterModule }      from "@angular/router";
import { CommonModule }      from "@angular/common";
import { Observable }        from "rxjs";

import { ProductService } from "../../../services/product.service";

import { ProductArticleComponent } from "../../product/article/product-article.component";
import { LoginWidgetComponent }    from "../../login/login.component";
import { IProduct }                from "../../../interfaces/product.interface";

declare var $: any;

@Component({
    selector:    '[front-page]',
    standalone:  true,
    imports:     [ 
        CommonModule, 
        RouterModule,
        LoginWidgetComponent,
        ProductArticleComponent
    ],
    templateUrl: './main-front-page.component.html',
    styleUrls:   ['./main-front-page.component.scss']
})
export class FrontPageComponent implements OnInit, AfterViewInit {
    public products: IProduct[] = [];

    constructor(private _productService: ProductService) {}

    ngOnInit(): void {
        this.getAllProducts();

        this.loadScript('assets/js/jquery.eislideshow.js');
        this.loadScript('assets/js/jquery.easing.1.3.js');
    }

    public getAllProducts(): void {
        this._productService.getAllProducts().subscribe((products: IProduct[]) => {
            this.products = products;
        });
    }

    private loadScript(src: string): void {
        const script: HTMLScriptElement = document.createElement('script');
        script.src = src;
        script.async = true;
        document.body.appendChild(script);
    }

    ngAfterViewInit(): void {
        this.initHomeSlider();
    }

    private initHomeSlider(): void {    
        $(function() {
            $('#ei-slider').eislideshow({
                animation:         'center',
                autoplay:           true,
                slideshow_interval: 3000,
                titlesFactor:       0
            });
        });
    }
}